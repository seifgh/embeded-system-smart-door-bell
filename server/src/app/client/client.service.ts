import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/services/auth.service';
import { ClientBackOfficeService } from './back-office/client-back-office.service';
import { LoginClientDto } from './client.dto';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @Inject(AuthService)
    private readonly authService: AuthService,
    private readonly boService: ClientBackOfficeService,
  ) {}

  async login(dto: LoginClientDto) {
    const foundClient = await this.clientRepository.findOne({
      where: {
        email: dto.email,
      },
      relations: ['homes'],
    });
    if (foundClient && (await foundClient.verifyPassword(dto.password))) {
      return {
        authToken: this.authService.generateAccessToken(foundClient.id),
        user: this.boService.formatClientData(foundClient),
      };
    }
    throw new HttpException(
      'Invalid password or email',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
