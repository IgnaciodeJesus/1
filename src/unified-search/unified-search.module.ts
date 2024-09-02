import { Module } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { WorldBankService } from '../world-bank/world-bank.service';
import { OfacService } from '../ofac/ofac.service';
import { UnifiedSearchService } from './unified-search.service';
import { UnifiedSearchController } from './unified-search.controller';
import { SearchModule } from '../search/search.module';
import { WorldBankModule } from '../world-bank/world-bank.module';
import { OfacModule } from '../ofac/ofac.module';

@Module({
  imports: [SearchModule, WorldBankModule, OfacModule], // Importing the modules that contain all the services used
  controllers: [UnifiedSearchController],
  providers: [
    UnifiedSearchService,
    SearchService,
    WorldBankService,
    OfacService,
  ],
})
export class UnifiedSearchModule {}
