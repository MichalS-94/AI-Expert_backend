import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateStreamDto {
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
