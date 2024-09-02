import { Test, TestingModule } from '@nestjs/testing';
import { UnifiedSearchService } from './unified-search.service';

describe('UnifiedSearchService', () => {
  let service: UnifiedSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnifiedSearchService],
    }).compile();

    service = module.get<UnifiedSearchService>(UnifiedSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
