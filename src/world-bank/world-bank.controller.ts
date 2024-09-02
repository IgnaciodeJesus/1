import { Controller, Get, Query } from '@nestjs/common';
import { WorldBankService } from './world-bank.service';

@Controller('world-bank')
export class WorldBankController {
  constructor(private readonly worldBankService: WorldBankService) {}

  @Get('search')
  async search(@Query('name') name: string): Promise<any> {
    return this.worldBankService.fetchDebarredFirms(name);
  }
}
