import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Osiedle Rzekowa 13',
    description: 'Name of the tenant',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123 Tenant St.',
    description: 'Address of the tenant',
  })
  address: string;
}
