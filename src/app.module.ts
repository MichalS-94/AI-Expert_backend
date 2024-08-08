import { Module } from '@nestjs/common';
import { NatsModule } from './nats/nats.module';
import { ProcessModule } from './process/process.module';
import { InfluxdbModule } from './influxdb/influxdb.module';

@Module({
  imports: [NatsModule, ProcessModule, InfluxdbModule],
})
export class AppModule {}
