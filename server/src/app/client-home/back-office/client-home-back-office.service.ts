import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ClientBackOfficeService } from 'src/app/client/back-office/client-back-office.service';
import { NOT_FOUND_BODY_RESPONSE } from 'src/shared/body-responses';
import { Repository } from 'typeorm';
import { ClientHomeEntity } from '../client-home.entity';
import { ClientHomeDto } from './client-home-back-office.dto';
import { ClientHomeData } from './client-home-back-office.interface';

@Injectable()
export class ClientHomeBackOfficeService {
  constructor(
    @InjectRepository(ClientHomeEntity)
    private readonly clientHomeRepository: Repository<ClientHomeEntity>,
    private readonly clientBackOfficeService: ClientBackOfficeService,
  ) {}

  async getOne(id: number): Promise<ClientHomeData> {
    return this.formatClientHomeData(await this.findOne(id));
  }

  async getMany(
    options: IPaginationOptions,
  ): Promise<Pagination<ClientHomeData>> {
    const paginatedData = await paginate<ClientHomeEntity>(
      this.clientHomeRepository,
      options,
      {
        relations: ['members', 'owner'],
        order: {
          updatedAt: 'DESC',
        },
      },
    );
    return new Pagination(
      paginatedData.items.map((clientHome) =>
        this.formatClientHomeData(clientHome),
      ),
      paginatedData.meta,
    );
  }

  async create(data: ClientHomeDto): Promise<ClientHomeData> {
    const newClientHome = new ClientHomeEntity();
    newClientHome.name = data.name;
    newClientHome.owner = await this.clientBackOfficeService.findOne(
      data.ownerId,
    );
    newClientHome.members = await Promise.all(
      data.membersIds.map((memberId) =>
        this.clientBackOfficeService.findOne(memberId),
      ),
    );
    return this.formatClientHomeData(
      await this.clientHomeRepository.save(newClientHome),
    );
  }

  async update(id: number, toUpdate: ClientHomeDto): Promise<ClientHomeData> {
    const foundClientHome = await this.findOne(id);
    foundClientHome.name = toUpdate.name;
    foundClientHome.owner = await this.clientBackOfficeService.findOne(
      toUpdate.ownerId,
    );
    foundClientHome.members = await Promise.all(
      toUpdate.membersIds.map((memberId) =>
        this.clientBackOfficeService.findOne(memberId),
      ),
    );
    await foundClientHome.save();
    return this.formatClientHomeData(foundClientHome);
  }

  async findOne(id: number): Promise<ClientHomeEntity> {
    const foundClient = await this.clientHomeRepository.findOne(id, {
      relations: ['members', 'owner'],
    });
    if (foundClient) {
      return foundClient;
    }
    throw new HttpException(NOT_FOUND_BODY_RESPONSE, HttpStatus.NOT_FOUND);
  }

  private formatClientHomeData(clientHome: ClientHomeEntity): ClientHomeData {
    return {
      id: clientHome.id,
      name: clientHome.name,
      raspberryPiCartKey: clientHome.raspberryPiCartKey,
      owner: this.clientBackOfficeService.formatClientData(clientHome.owner),
      members: clientHome.members.map(
        this.clientBackOfficeService.formatClientData,
      ),
      createdAt: clientHome.createdAt,
      updatedAt: clientHome.updatedAt,
    };
  }

  async deleteOne(id: number) {
    const foundClient = await this.findOne(id);
    await foundClient.remove();
  }
}
