import { Test, TestingModule } from '@nestjs/testing';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';

describe('ProcessController', () => {
  let processController: ProcessController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProcessController],
      providers: [ProcessService],
    }).compile();

    processController = app.get<ProcessController>(ProcessController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(processController.getProcessHello()).toBe('Hello World!');
    });
  });
});
