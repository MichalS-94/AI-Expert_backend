import { Module } from '@nestjs/common';
import { NatsModule } from './nats/nats.module';
import { ProcessModule } from './process/process.module';
import { InfluxdbModule } from './influxdb/influxdb.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [NatsModule, ProcessModule, InfluxdbModule, ConfigModule.forRoot()],
})
export class AppModule {}
