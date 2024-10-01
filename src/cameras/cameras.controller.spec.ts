import { Test, TestingModule } from '@nestjs/testing';
import { CamerasController } from './cameras.controller';

describe('CamerasController', () => {
  let controller: CamerasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamerasController],
    }).compile();

    controller = module.get<CamerasController>(CamerasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
