import { Module } from '@nestjs/common';
import { OfacService } from './ofac.service';
import { OfacController } from './ofac.controller';

@Module({
  controllers: [OfacController],
  providers: [OfacService],
})
export class OfacModule {}
