import { Controller } from '@nestjs/common';
import { ClientHomeService } from './client-home.service';

@Controller()
export class ClientHomeController {
  constructor(private readonly clientHomeService: ClientHomeService) {}
}
