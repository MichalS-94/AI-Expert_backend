import { Module } from '@nestjs/common';
import { InfluxdbService } from './influxdbb.service';

@Module({
  providers: [InfluxdbService],
  exports: [InfluxdbService],
})
export class InfluxdbModule {}
