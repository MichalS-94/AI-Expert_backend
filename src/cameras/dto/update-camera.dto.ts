import { IsString, IsNotEmpty, IsNumber, isNumber } from 'class-validator';

export class UpdateCameraDto {
  @IsNotEmpty()
  @IsString()
  processId: string;

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
