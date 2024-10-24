import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '../tenants/tenants.entity';
import { Camera } from '../cameras/cameras.entity';
import { User } from 'src/users/users.entity';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: 5433,
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: 'my_database',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Tenant, Camera, User]),
  ],
})
export class PostgresModule {}
