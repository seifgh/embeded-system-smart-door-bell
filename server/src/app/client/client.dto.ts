import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginClientDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(120)
  password: string;
}
