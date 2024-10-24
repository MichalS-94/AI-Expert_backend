import { Module } from '@nestjs/common';
import { NatsModule } from './nats/nats.module';
import { ProcessModule } from './process/process.module';
import { InfluxdbModule } from './influxdb/influxdb.module';
import { PostgresModule } from './postgres/postgres.module';
import { CamerasModule } from './cameras/cameras.module';
import { TenantsModule } from './tenants/tenants.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NatsModule,
    ProcessModule,
    InfluxdbModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule,
    CamerasModule,
    TenantsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
