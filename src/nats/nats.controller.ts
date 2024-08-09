import { Controller, Get } from '@nestjs/common';
import { NatsService } from './nats.service';
import { EventPattern, Payload, Ctx, NatsContext } from '@nestjs/microservices';
import { InfluxDBService } from '../influxdb/influxdb.service'; // Import the InfluxDB service

@Controller()
export class NatsController {
  constructor(
    private readonly appService: NatsService,
    private readonly influxDBService: InfluxDBService, // Inject the InfluxDB service
  ) {}

  @Get('test')
  async testEndpoint() {
    const message = { text: 'Hello, NATS!' };
    await this.appService.sendMessage('test-topic', message);
    console.log('Message sent to NATS:', message);
    return 'Message sent to NATS';
  }

  @Get('testPublish')
  async testEndpointPublish() {
    const message = {
      text: 'Hello, NATS!',
      timestamp: new Date().toISOString(),
    };
    await this.appService.publishMessage('test-topic', message);
    console.log('Message sent to NATS:', message);
    return 'Message sent to NATS';
  }

  @EventPattern('test-topic')
  async handleTestTopic(@Payload() data: any, @Ctx() context: NatsContext) {
    console.log('Received message from NATS:', data);
    await this.influxDBService.saveMessage(data); // Save the message to InfluxDB
  }
}
