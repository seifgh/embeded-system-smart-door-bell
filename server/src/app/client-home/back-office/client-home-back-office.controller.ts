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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationLimitValuePipe } from 'src/shared/pipes/pagination.pipe';
import { ClientHomeDto } from './client-home-back-office.dto';
import { ClientHomeBackOfficeService } from './client-home-back-office.service';

@Controller('/back-office/clients-home')
export class ClientHomeBackOfficeController {
  constructor(
    private readonly clientHomeBackOfficeService: ClientHomeBackOfficeService,
  ) {}

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientHomeBackOfficeService.getOne(id);
  }

  @Get()
  getMany(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query(
      'limit',
      new DefaultValuePipe(5),
      ParseIntPipe,
      new PaginationLimitValuePipe(),
    )
    limit: number,
  ) {
    return this.clientHomeBackOfficeService.getMany({ page, limit });
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() data: ClientHomeDto) {
    return this.clientHomeBackOfficeService.create(data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientHomeBackOfficeService.deleteOne(id);
  }
}
