import { Test, TestingModule } from '@nestjs/testing';
import { BattlenetService } from './battlenet.service';

describe('BattlenetService', () => {
  let service: BattlenetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattlenetService],
    }).compile();

    service = module.get<BattlenetService>(BattlenetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
