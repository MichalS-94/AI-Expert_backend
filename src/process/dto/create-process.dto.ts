import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProcessDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '192.169.100.1', description: 'IP of the camera' })
  cameraIp: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user', description: 'User used to login to camera' })
  cameraUser: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'Password used to login to camera',
  })
  cameraPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'Channel number of the camera' })
  channel: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ID of the tenant' })
  tenantId: number;
}
