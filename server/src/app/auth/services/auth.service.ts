import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async findOneByIdOrThrowUnauthorizedException(
    id: number,
  ): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne(id);
    if (foundUser) return foundUser;
    throw new UnauthorizedException();
  }

  generateAccessToken(userId: number): string {
    const signPayload: JwtPayload = { userId };
    return this.jwtService.sign(signPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES'),
    });
  }
  getUserIdFromJwt(jwt: string) {
    try {
      const payload: JwtPayload = this.jwtService.verify(jwt, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      return payload.userId;
    } catch (err) {
      return null;
    }
  }
}
