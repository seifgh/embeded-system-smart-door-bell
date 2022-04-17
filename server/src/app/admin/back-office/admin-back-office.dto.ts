import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { AdminRole } from '../admin.entity';

abstract class AdminDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(120)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(AdminRole)
  role: AdminRole;
}

export class CreateAdminDto extends AdminDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(120)
  password: string;
}

export class UpdateAdminDto extends AdminDto {
  @IsOptional()
  @MinLength(8)
  @MaxLength(120)
  password: string;
}
