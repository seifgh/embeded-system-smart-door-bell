import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginClientDto } from './client.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UsePipes(new ValidationPipe())
  @Post('/auth/login')
  async login(@Body() dto: LoginClientDto) {
    return this.clientService.login(dto);
  }
}
