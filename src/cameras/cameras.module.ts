import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamerasController } from './cameras.controller';
import { CamerasService } from './cameras.service';
import { Camera } from './cameras.entity';
import { Tenant } from '../tenants/tenants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Camera, Tenant])],
  controllers: [CamerasController],
  providers: [CamerasService],
  exports: [TypeOrmModule],
})
export class CamerasModule {}
