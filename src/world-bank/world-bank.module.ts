import { Module } from '@nestjs/common';
import { WorldBankService } from './world-bank.service';
import { WorldBankController } from './world-bank.controller';

@Module({
  controllers: [WorldBankController],
  providers: [WorldBankService],
})
export class WorldBankModule {}
