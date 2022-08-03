import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class ClientHomeDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(120)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  membersIds: number[];
}
