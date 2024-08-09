import { Module } from '@nestjs/common';
import { InfluxDBService } from './influxdb.service';

@Module({
  providers: [InfluxDBService],
  exports: [InfluxDBService],
})
export class InfluxdbModule {}
