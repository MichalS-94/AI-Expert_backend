import { Controller, Get, Post, Body } from '@nestjs/common';
import { NatsService } from './nats.service';
import { EventPattern, Payload, Ctx, NatsContext } from '@nestjs/microservices';
import { InfluxDBService } from '../influxdb/influxdb.service'; // Import the InfluxDB service

@Controller()
export class NatsController {
  constructor(
    private readonly natsService: NatsService,
    private readonly influxDBService: InfluxDBService, // Inject the InfluxDB service
  ) {}

  @Post('test')
  async testEndpoint(
    @Body()
    msg,
  ) {
    const message = { text: 'Hello, NATS!' };
    await this.natsService.sendMessage('test-topic', msg || message);
    return 'Message sent to NATS';
  }

  @Get('testPublish')
  async testEndpointPublish() {
    const message = {
      text: 'Hello, NATS!',
      timestamp: new Date().toISOString(),
    };
    await this.natsService.publishMessage('test-topic', message);
    return 'Message sent to NATS';
  }

  @EventPattern('test-topic')
  async handleTestTopic(@Payload() data: any) {
    try {
      await this.influxDBService.saveMessage(data);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }
}
