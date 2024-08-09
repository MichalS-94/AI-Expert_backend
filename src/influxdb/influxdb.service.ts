import { Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';

@Injectable()
export class InfluxDBService {
  private influxDB: InfluxDB;
  private writeApi: ReturnType<InfluxDB['getWriteApi']>;

  constructor() {
    this.influxDB = new InfluxDB({
      url: process.env.INFLUXDB_URL || 'http://localhost:8086',
      token: process.env.INFLUXDB_TOKEN || 'my-token',
    });
    this.writeApi = this.influxDB.getWriteApi(
      process.env.INFLUXDB_ORG || 'tomfoolery',
      process.env.INFLUXDB_BUCKET || '95f5e31e75586f68',
    );
  }

  async writePoint(bucket: string, org: string, point: Point) {
    try {
      this.writeApi.writePoint(point);
      await this.writeApi.close();
    } catch (error) {
      console.error('Error writing point: ', error);
    }
  }

  async query(query: string, org: string) {
    const queryApi = this.influxDB.getQueryApi(org);
    return queryApi.collectRows(query);
  }

  async saveMessage(message: any): Promise<boolean> {
    try {
      const point = new Point('nats_message')
        .tag('topic', 'test-topic')
        .stringField('text', message.text)
        .floatField('value', 10 * Math.random())
        .stringField('timestamp', message.timestamp);

      this.writeApi.writePoint(point);
      this.writeApi.flush().then(() => {
        console.log('WRITE FINISHED');
      });
    } catch (error) {
      console.error('Error saving message: ', error);
      return false; // Indicate failure
    }
  }
}
