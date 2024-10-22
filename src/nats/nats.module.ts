import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsService } from './nats.service';
import { NatsController } from './nats.controller';
import { InfluxDBService } from 'src/influxdb/influxdb.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE2137',
        transport: Transport.NATS,
        options: {
          url: 'nats://10.10.198.151:8222',
        },
      },
    ]),
  ],
  providers: [NatsService, InfluxDBService],
  controllers: [NatsController],
  exports: [NatsService],
})
export class NatsModule {}
