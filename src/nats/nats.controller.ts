import { Controller, Get } from '@nestjs/common';
import { NatsService } from './nats.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NatsController {
  constructor(private readonly appService: NatsService) {}

  @Get('test')
  async testEndpoint() {
    const message = { text: 'Hello, NATS!' };
    const resp = await this.appService.sendMessage('test-topic', message);
    console.log('Response from NATS:', resp);
    return 'Message sent to NATS';
  }

  @EventPattern('test-topic')
  handleTestTopic(@Payload() data: any) {
    console.log('Received message from NATS:');
  }
}
