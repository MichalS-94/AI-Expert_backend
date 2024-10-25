import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCameraDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '192.168.200.11',
    description: 'IP address of the camera',
  })
  ip: string;

  @IsString()
  @ApiProperty({
    example: '192-168-200-11-1',
    description: 'ID of the process',
  })
  processId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user', description: 'Username for the camera' })
  user: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'Password for the camera',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: 'Channel number of the camera stream',
  })
  channel: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ID of the tenant that ' })
  tenantId: number;
}
