import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateStreamDto {
  @IsUrl()
  @IsNotEmpty()
  restreamerUrl: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  camera_ip: string;

  @IsString()
  @IsNotEmpty()
  camera_user: string;

  @IsString()
  @IsNotEmpty()
  camera_password: string;

  @IsNotEmpty()
  channel: number;
}
