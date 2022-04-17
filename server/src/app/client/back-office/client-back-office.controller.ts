import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PaginationLimitValuePipe } from 'src/shared/pipes/pagination.pipe';
import { imageFileFilter, setFileName } from 'src/utils/multer';
import { CreateClientDto, UpdateClientDto } from './client-back-office.dto';
import { ClientBackOfficeService } from './client-back-office.service';

@Controller('back-office/clients')
export class ClientBackOfficeController {
  constructor(
    private readonly clientBackOfficeService: ClientBackOfficeService,
  ) {}

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientBackOfficeService.getOne(id);
  }

  @Get()
  async getMany(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query(
      'limit',
      new DefaultValuePipe(5),
      ParseIntPipe,
      new PaginationLimitValuePipe(),
    )
    limit: number,
  ) {
    return this.clientBackOfficeService.getMany({
      page,
      limit,
    });
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/upload/clients',
        filename: setFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateClientDto,
  ) {
    return this.clientBackOfficeService.create(image, body);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/upload/clients',
        filename: setFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() body: UpdateClientDto,
  ) {
    return this.clientBackOfficeService.update(id, image, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientBackOfficeService.deleteOne(id);
  }

  @Get('/search/:emailSearchQuery')
  searchByEmail(@Param('emailSearchQuery') emailSearchQuery: string) {
    return this.clientBackOfficeService.searchClientsByEmail(emailSearchQuery);
  }
}
