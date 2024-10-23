import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Tenant } from '../tenants/tenants.entity';
import { Camera } from '../cameras/cameras.entity';
import { User } from 'src/users/users.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5433,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'my_database',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Tenant, Camera, User]),
  ],
})
export class PostgresModule {}

// @Module({
//   imports: [
//     ConfigModule,
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>(
//           'POSTGRES_HOST',
//           process.env.POSTGRES_HOST || 'localhost',
//         ),
//         port: configService.get<number>('POSTGRES_PORT', 5433),
//         username: configService.get<string>(
//           'POSTGRES_USER',
//           process.env.POSTGRES_USER,
//         ),
//         password: configService.get<string>(
//           'POSTGRES_PASSWORD',
//           process.env.POSTGRES_PASSWORD,
//         ),
//         database: configService.get<string>('POSTGRES_DB', 'my_database'),
//         synchronize: true,
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
