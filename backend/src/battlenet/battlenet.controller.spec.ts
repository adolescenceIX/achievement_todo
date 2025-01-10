import { Test, TestingModule } from '@nestjs/testing';
import { BattlenetController } from './battlenet.controller';

describe('BattlenetController', () => {
  let controller: BattlenetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattlenetController],
    }).compile();

    controller = module.get<BattlenetController>(BattlenetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
