import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { SearchModule } from './search/search.module';
import { WorldBankModule } from './world-bank/world-bank.module';
import { OfacModule } from './ofac/ofac.module';
import { UnifiedSearchModule } from './unified-search/unified-search.module';

// Importing all the modules that contain the services used
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TasksModule,
    SearchModule,
    WorldBankModule,
    OfacModule,
    UnifiedSearchModule,
  ],
})
export class AppModule {}
