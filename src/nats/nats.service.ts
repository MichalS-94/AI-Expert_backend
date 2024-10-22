import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class NatsService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        url: 'nats://10.10.198.151:8222', // Replace with your NATS server URL if different
      },
    });
  }

  async sendMessage(pattern: string, data: any) {
    return this.client.send(pattern, data).subscribe();
  }

  async publishMessage(pattern: string, data: any) {
    return this.client.emit(pattern, data).subscribe();
  }
}
