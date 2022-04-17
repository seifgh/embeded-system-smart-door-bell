import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientHomeEntity } from './client-home.entity';

@Injectable()
export class ClientHomeService {
  constructor(
    @InjectRepository(ClientHomeEntity)
    private readonly clientHomeRepository: Repository<ClientHomeEntity>,
  ) {}
}
