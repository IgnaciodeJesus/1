import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { UnifiedSearchService } from './unified-search.service';

@Controller('unified-search')
export class UnifiedSearchController {
  constructor(private readonly unifiedSearchService: UnifiedSearchService) {}

  @Get('search')
  async searchByName(@Query('name') name: string) {
    if (!name) {
      throw new BadRequestException('Name parameter is required.');
    }
    return await this.unifiedSearchService.searchAll(name);
  }
}
