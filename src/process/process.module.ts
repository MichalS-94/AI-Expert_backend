import { Logger, Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { HttpModule } from '@nestjs/axios';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    HttpModule,
    WinstonModule.forRoot({
      // options
    }),
  ],
  controllers: [ProcessController],
  providers: [ProcessService, Logger],
})
export class ProcessModule {}
