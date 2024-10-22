import { Module } from '@nestjs/common';
import { NatsModule } from './nats/nats.module';
import { ProcessModule } from './process/process.module';
import { InfluxdbModule } from './influxdb/influxdb.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './postgres/postgres.module';
import { CamerasModule } from './cameras/cameras.module';
import { TenantsModule } from './tenants/tenants.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    NatsModule,
    ProcessModule,
    InfluxdbModule,
    ConfigModule.forRoot(),
    PostgresModule,
    CamerasModule,
    TenantsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
