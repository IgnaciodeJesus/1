import { Test, TestingModule } from '@nestjs/testing';
import { WorldBankController } from './world-bank.controller';

describe('WorldBankController', () => {
  let controller: WorldBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldBankController],
    }).compile();

    controller = module.get<WorldBankController>(WorldBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
