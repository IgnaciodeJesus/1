import { Test, TestingModule } from '@nestjs/testing';
import { UnifiedSearchController } from './unified-search.controller';

describe('UnifiedSearchController', () => {
  let controller: UnifiedSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnifiedSearchController],
    }).compile();

    controller = module.get<UnifiedSearchController>(UnifiedSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
