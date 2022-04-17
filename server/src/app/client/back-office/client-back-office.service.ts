import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs/promises';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { join } from 'path';
import { TypeOrmErrorCodes } from 'src/constants/typeorm-error-codes';
import {
  IMAGE_REQUIRED_BODY_RESPONSE,
  NOT_FOUND_BODY_RESPONSE,
  UNIQUE_EMAIL_BODY_RESPONSE,
} from 'src/shared/body-responses';
import { Like, QueryFailedError, Repository } from 'typeorm';
import { ClientEntity } from '../client.entity';
import { CreateClientDto, UpdateClientDto } from './client-back-office.dto';
import { ClientData } from './client-back-office.interface';

@Injectable()
export class ClientBackOfficeService {
  private readonly logger = new Logger(ClientBackOfficeService.name);

  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async getOne(id: number): Promise<ClientData> {
    return this.formatClientData(await this.findOne(id));
  }

  async getMany(options: IPaginationOptions): Promise<Pagination<ClientData>> {
    const paginatedData = await paginate<ClientEntity>(
      this.clientRepository,
      options,
      {
        order: {
          updatedAt: 'DESC',
        },
      },
    );
    return new Pagination(
      paginatedData.items.map((admin) => this.formatClientData(admin)),
      paginatedData.meta,
    );
  }

  async searchClientsByEmail(email: string): Promise<ClientData[]> {
    const foundClients = await this.clientRepository.find({
      where: {
        email: Like(`%${email}%`),
      },
    });

    return foundClients.map(this.formatClientData);
  }

  async create(
    image: Express.Multer.File,
    data: CreateClientDto,
  ): Promise<ClientData> {
    try {
      const newClient = new ClientEntity();
      if (image) {
        newClient.imageURL = image.path;
      } else {
        throw new HttpException(
          IMAGE_REQUIRED_BODY_RESPONSE,
          HttpStatus.BAD_REQUEST,
        );
      }
      newClient.email = data.email;
      newClient.fullName = data.fullName;
      newClient.password = data.password;
      await newClient.hashPassword();

      return this.formatClientData(await this.clientRepository.save(newClient));
    } catch (err) {
      this.handleUniqueEmailError(err);
    }
  }

  async update(
    id: number,
    image: Express.Multer.File,
    toUpdate: UpdateClientDto,
  ): Promise<ClientData> {
    const foundClient = await this.findOne(id);
    if (foundClient) {
      try {
        foundClient.email = toUpdate.email;
        foundClient.fullName = toUpdate.fullName;
        if (toUpdate.password) {
          foundClient.password = toUpdate.password;
          await foundClient.hashPassword();
        }
        if (image) {
          this.deleteClientImage(foundClient);
          foundClient.imageURL = image.path;
        }
        await foundClient.save();
        return this.formatClientData(foundClient);
      } catch (err) {
        this.handleUniqueEmailError(err);
      }
    }
  }

  async deleteOne(id: number) {
    const foundClient = await this.findOne(id);
    this.deleteClientImage(foundClient);
    await foundClient.remove();
  }

  private deleteClientImage(client: ClientEntity) {
    unlink(join('./', client.imageURL)).catch((err) => {
      this.logger.error(err);
    });
  }

  formatClientData(client: ClientEntity): ClientData {
    return {
      id: client.id,
      email: client.email,
      fullName: client.fullName,
      imageUrl: client.imageURL,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }

  async findOne(id: number): Promise<ClientEntity> {
    const foundAClient = await this.clientRepository.findOne(id);
    if (foundAClient) {
      return foundAClient;
    }
    throw new HttpException(NOT_FOUND_BODY_RESPONSE, HttpStatus.NOT_FOUND);
  }

  private handleUniqueEmailError(err: QueryFailedError | any) {
    if (
      err instanceof QueryFailedError &&
      err.driverError.errno == TypeOrmErrorCodes.DUPLICATED_KEY
    ) {
      throw new HttpException(
        UNIQUE_EMAIL_BODY_RESPONSE,
        HttpStatus.BAD_REQUEST,
      );
    }
    throw err;
  }
}
