import { Test, TestingModule } from '@nestjs/testing';
import { OfacController } from './ofac.controller';

describe('OfacController', () => {
  let controller: OfacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfacController],
    }).compile();

    controller = module.get<OfacController>(OfacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
