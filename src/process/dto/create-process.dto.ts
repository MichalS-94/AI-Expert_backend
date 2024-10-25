import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProcessDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '192.169.100.1', description: 'IP of the camera' })
  cameraIp: string;

  @IsString()
  @IsNotEmpty()
  cameraUser: string;

  @IsString()
  @IsNotEmpty()
  cameraPassword: string;

  @IsNotEmpty()
  channel: string;

  @IsNotEmpty()
  tenantId: number;
}
