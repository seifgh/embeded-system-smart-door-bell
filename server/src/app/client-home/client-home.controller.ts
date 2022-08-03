import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthClient } from 'src/shared/decorators/auth-client.decorator';
import { IsClientGuard } from 'src/shared/guards/is-client.guard';
import { imageFileFilter, setFileName } from 'src/utils/multer';
import { ClientEntity } from '../client/client.entity';
import { ClientHomeService } from './client-home.service';

@Controller('client-homes')
// @UseGuards(IsClientGuard)
export class ClientHomeController {
  constructor(private readonly clientHomeService: ClientHomeService) {}

  @Post('history/:raspberryPiCartKey')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/upload/clients',
        filename: setFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  addHistory(
    @UploadedFile() image: Express.Multer.File,
    @Param('raspberryPiCartKey') raspberryPiCartKey: string,
  ) {
    return this.clientHomeService.addHistory(image, raspberryPiCartKey);
  }

  @UseGuards(IsClientGuard)
  @Get('client-histories/all')
  getAllClientHistories(@AuthClient() client: ClientEntity) {
    return this.clientHomeService.getAllClientHistories(client);
  }

  @UseGuards(IsClientGuard)
  @Get('client-histories/latest')
  getLatestClientHistories(@AuthClient() client: ClientEntity) {
    return this.clientHomeService.getLatestClientHistories(client);
  }
}
