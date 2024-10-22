import { Logger, Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { CamerasService } from '../cameras/cameras.service';
import { ProcessController } from './process.controller';
import { HttpModule } from '@nestjs/axios';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { CamerasModule } from 'src/cameras/cameras.module';

@Module({
  imports: [
    HttpModule,
    CamerasModule,
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'ai-expert-backend' },
      transports: [
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({
          filename: 'combined.log',
          format: winston.format.simple(),
        }),
        new winston.transports.Console({
          format: winston.format.colorize(),
        }),
      ],
    }),
  ],
  controllers: [ProcessController],
  providers: [ProcessService, Logger, CamerasService],
})
export class ProcessModule {}
