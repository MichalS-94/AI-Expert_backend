import { Module } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller';

@Module({
  providers: [CamerasService],
  controllers: [CamerasController]
})
export class CamerasModule {}
