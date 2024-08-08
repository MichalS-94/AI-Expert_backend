import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsService } from './nats.service';
import { NatsController } from './nats.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
        },
      },
    ]),
  ],
  providers: [NatsService],
  controllers: [NatsController],
  exports: [NatsService],
})
export class NatsModule {}
