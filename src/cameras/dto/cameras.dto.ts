import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCameraDto {
  @IsNumber()
  @IsNotEmpty()
  camId: number;

  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  channel: string;

  @IsNumber()
  @IsNotEmpty()
  tenantId: number;
}
