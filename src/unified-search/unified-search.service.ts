import { Injectable, Logger } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { WorldBankService } from '../world-bank/world-bank.service';
import { OfacService } from '../ofac/ofac.service';

@Injectable()
export class UnifiedSearchService {
  private readonly logger = new Logger(UnifiedSearchService.name);

  constructor(
    private readonly searchService: SearchService,
    private readonly worldBankService: WorldBankService,
    private readonly ofacService: OfacService,
  ) {}

  async searchAll(name: string): Promise<any[]> {
    if (!name) {
      throw new Error('Name parameter is required.');
    }

    try {
      const offshoreResults = await this.searchService
        .searchEntity(name)
        .catch((err) => {
          this.logger.error(
            `Error fetching from Offshore Leaks: ${err.message}`,
          );
          return []; // Return an empty array in case of an error
        });

      const worldBankResults = await this.worldBankService
        .fetchDebarredFirms(name)
        .catch((err) => {
          this.logger.error(`Error fetching from World Bank: ${err.message}`);
          return []; // Return an empty array in case of an error
        });

      const ofacResults = await this.ofacService
        .searchByName(name)
        .catch((err) => {
          this.logger.error(`Error fetching from OFAC: ${err.message}`);
          return []; // Return an empty array in case of an error
        });

      return [...offshoreResults, ...worldBankResults, ...ofacResults]; // Combine results from all services
    } catch (error) {
      this.logger.error(`Error in unified search: ${error.message}`);
      throw new Error('Failed to perform unified search.');
    }
  }
}
