import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProcessDto {
  @IsString()
  @IsNotEmpty()
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
