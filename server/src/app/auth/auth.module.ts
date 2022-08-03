import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { AtJwtStrategy } from './strategies/at-jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  controllers: [],
  providers: [AtJwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
