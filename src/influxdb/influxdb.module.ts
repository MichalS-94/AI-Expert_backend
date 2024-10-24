import { Module } from '@nestjs/common';
import { InfluxDBService } from './influxdb.service';
import { InfluxdbController } from './influxdb.controller';

@Module({
  providers: [InfluxDBService],
  exports: [InfluxDBService],
  controllers: [InfluxdbController],
})
export class InfluxdbModule {}
