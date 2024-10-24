import { Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfluxDBService {
  private influxDB: InfluxDB;
  private writeApi: ReturnType<InfluxDB['getWriteApi']>;

  inject: [ConfigService];
  constructor(configService: ConfigService) {
    this.influxDB = new InfluxDB({
      url: configService.get<string>('INFLUXDB_URL'),
      token: configService.get<string>('INFLUXDB_TOKEN'),
    });
    this.writeApi = this.influxDB.getWriteApi(
      configService.get<string>('INFLUXDB_ORG'),
      configService.get<string>('INFLUXDB_BUCKET'),
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

  async saveMessage(data: any) {
    try {
      const point = new Point('nats_msg_message')
        .tag('topic', 'example-topic')
        .stringField('text', data.text)
        .stringField('text', 'another text field' + Math.random())
        .floatField('value', 10 * Math.random())
        .floatField('testval2', 10 * Math.random());

      this.writeApi.writePoint(point);
      this.writeApi.flush().then(() => {});
    } catch (error) {
      console.error('Error saving message: ', error);
      throw error;
    }
  }
}
