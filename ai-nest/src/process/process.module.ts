import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';

@Module({
  controllers: [ProcessController],
  providers: [ProcessService],
})
export class ProcessModule {}
