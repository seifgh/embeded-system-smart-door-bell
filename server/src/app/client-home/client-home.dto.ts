import { IsNotEmpty } from 'class-validator';

export class AddHistoryDto {
  // @IsNotEmpty()
  raspberryPiCartKey: string;
}
