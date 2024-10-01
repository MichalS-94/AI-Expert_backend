import { Controller, Get, Post, Body } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Tenant } from './tenants.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('list')
  async findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }

  @Post('add')
  async create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    console.log(createTenantDto);
    return this.tenantsService.create(createTenantDto);
  }
}
