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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationLimitValuePipe } from 'src/shared/pipes/pagination.pipe';
import { CreateAdminDto, UpdateAdminDto } from './admin-back-office.dto';
import { AdminBackOfficeService } from './admin-back-office.service';

@Controller('back-office/admins')
export class AdminBackOfficeController {
  constructor(
    private readonly adminBackOfficeService: AdminBackOfficeService,
  ) {}

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminBackOfficeService.getOne(id);
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
    return this.adminBackOfficeService.getMany({
      page,
      limit,
    });
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() data: CreateAdminDto) {
    return this.adminBackOfficeService.create(data);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() toUpdate: UpdateAdminDto,
  ) {
    return this.adminBackOfficeService.update(id, toUpdate);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminBackOfficeService.deleteOne(id);
  }
}
