import { Test, TestingModule } from '@nestjs/testing';
import { WorldBankService } from './world-bank.service';

describe('WorldBankService', () => {
  let service: WorldBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorldBankService],
    }).compile();

    service = module.get<WorldBankService>(WorldBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
