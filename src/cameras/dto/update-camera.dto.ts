import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCameraDto {
  @IsString()
  ip: string;

  @IsString()
  user: string;

  @IsString()
  password: string;

  @IsString()
  channel: string;

  @IsNumber()
  tenantId: number;
}
