import { Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';

@Injectable()
export class InfluxdbService {
  private influxDB: InfluxDB;

  constructor() {
    this.influxDB = new InfluxDB({
      url: process.env.INFLUXDB_URL || 'http://localhost:8086',
      token: process.env.INFLUXDB_TOKEN || 'my-token',
    });
  }

  async writePoint(bucket: string, org: string, point: Point) {
    const writeApi = this.influxDB.getWriteApi(org, bucket);
    writeApi.writePoint(point);
    await writeApi.close();
  }

  async query(query: string, org: string) {
    const queryApi = this.influxDB.getQueryApi(org);
    return queryApi.collectRows(query);
  }
}
