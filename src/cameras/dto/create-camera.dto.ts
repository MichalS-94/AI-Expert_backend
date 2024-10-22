import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCameraDto {
  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsString()
  processId: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  channel: string;

  @IsNotEmpty()
  tenantId: number;
}
