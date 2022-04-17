import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

abstract class ClientDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(120)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateClientDto extends ClientDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(120)
  password: string;
}

export class UpdateClientDto extends ClientDto {
  @IsOptional()
  @MinLength(8)
  @MaxLength(120)
  password: string;
}
