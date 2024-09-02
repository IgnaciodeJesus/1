import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { OfacService } from './ofac.service';

@Controller('ofac')
export class OfacController {
  constructor(private readonly ofacService: OfacService) {}

  @Get('search')
  async searchByName(@Query('name') name: string) {
    if (!name) {
      throw new BadRequestException('Name parameter is required.');
    }
    return await this.ofacService.searchByName(name);
  }
}
