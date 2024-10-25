import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TenantDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the tenant' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Tenant Name', description: 'Name of the tenant' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123 Tenant St.',
    description: 'Address of the tenant',
  })
  address: string;
}
