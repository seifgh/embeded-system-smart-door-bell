import {
  Body,
  ClassSerializerInterceptor,
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
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  IsAdminGuard,
  IsAdminSuperuserGuard,
} from 'src/shared/guards/is-admin.guard';
import { PaginationLimitValuePipe } from 'src/shared/pipes/pagination.pipe';
import {
  CreateAdminDto,
  LoginAdminDto,
  UpdateAdminDto,
} from './admin-back-office.dto';
import { AdminBackOfficeService } from './admin-back-office.service';

@Controller('back-office/admins')
export class AdminBackOfficeController {
  constructor(
    private readonly adminBackOfficeService: AdminBackOfficeService,
  ) {}

  @UseGuards(IsAdminSuperuserGuard)
  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminBackOfficeService.getOne(id);
  }

  @UseGuards(IsAdminSuperuserGuard)
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

  @UseGuards(IsAdminSuperuserGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() data: CreateAdminDto) {
    return this.adminBackOfficeService.create(data);
  }

  @UseGuards(IsAdminSuperuserGuard)
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() toUpdate: UpdateAdminDto,
  ) {
    return this.adminBackOfficeService.update(id, toUpdate);
  }

  @UseGuards(IsAdminSuperuserGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminBackOfficeService.deleteOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('/auth/login')
  async login(@Body() dto: LoginAdminDto) {
    return this.adminBackOfficeService.login(dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(IsAdminGuard)
  @Get('/auth/data')
  async authGuardTest(@Req() req: Request) {
    return req.user;
  }
}
