import { Module } from '@nestjs/common';
import { NatsModule } from './nats/nats.module';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [NatsModule, ProcessModule],
})
export class AppModule {}
