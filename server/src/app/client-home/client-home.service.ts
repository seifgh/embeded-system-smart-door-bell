import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadedFile } from 'adminjs';
import { IMAGE_REQUIRED_BODY_RESPONSE } from 'src/shared/body-responses';
import { In, Repository } from 'typeorm';
import { ClientEntity } from '../client/client.entity';
import { ClientHomeHistoryEntity } from './client-home-history.entity';
import { AddHistoryDto } from './client-home.dto';
import { ClientHomeEntity } from './client-home.entity';

@Injectable()
export class ClientHomeService {
  constructor(
    @InjectRepository(ClientHomeEntity)
    private readonly clientHomeRepository: Repository<ClientHomeEntity>,
    @InjectRepository(ClientHomeHistoryEntity)
    private readonly clientHomeHistoryRepository: Repository<ClientHomeHistoryEntity>,
  ) {}

  async addHistory(image: Express.Multer.File, raspberryPiCartKey: string) {
    const foundHome = await this.clientHomeRepository.findOne({
      where: {
        raspberryPiCartKey: raspberryPiCartKey,
      },
    });
    if (!foundHome) {
      throw new NotFoundException('Home not found');
    }
    if (!image)
      throw new HttpException(
        IMAGE_REQUIRED_BODY_RESPONSE,
        HttpStatus.BAD_REQUEST,
      );
    const newHistory = this.clientHomeHistoryRepository.create({
      home: foundHome,
      imageURL: image.path,
    });
    return this.clientHomeHistoryRepository.save(newHistory);
  }

  async validateClientMember(client: ClientEntity, home: ClientHomeEntity) {
    if (
      home.owner.id !== client.id &&
      !home.members.find((member) => member.id === client.id)
    ) {
      throw new ForbiddenException('Client is not a member');
    }
  }

  async getAllClientHistories(client: ClientEntity) {
    const clientHomes = await this.clientHomeRepository.find({
      where: {
        owner: client,
      },
    });

    return this.formatHistories(
      await this.clientHomeHistoryRepository.find({
        where: {
          home: In(clientHomes.map((c) => c.id)),
        },
        relations: ['home'],
        order: {
          createdAt: 'DESC',
        },
      }),
    );
  }

  async getLatestClientHistories(client: ClientEntity) {
    const clientHomes = await this.clientHomeRepository.find({
      where: {
        owner: client,
      },
    });

    return this.formatHistories(
      await this.clientHomeHistoryRepository.find({
        where: {
          home: In(clientHomes.map((c) => c.id)),
        },
        relations: ['home'],
        order: {
          createdAt: 'DESC',
        },
        take: 10,
      }),
    );
  }

  async getClientHomeByRaspKey(raspberryPiCartKey: string) {
    return this.clientHomeRepository.findOne({
      where: {
        raspberryPiCartKey: raspberryPiCartKey,
      },
      relations: ['owner', 'histories'],
    });
  }

  formatHistories(histories: ClientHomeHistoryEntity[]) {
    return histories.map((h) => ({
      id: h.id,
      createdAt: h.createdAt,
      homeName: h.home.name,
      imageUrl: h.imageURL,
    }));
  }
}
