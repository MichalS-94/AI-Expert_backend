import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateStreamDto {
  @IsUrl()
  @IsNotEmpty()
  restreamerUrl: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  camera_ip: string;

  @IsNotEmpty()
  camera_user: string;

  @IsNotEmpty()
  camera_password: string;

  @IsNotEmpty()
  channel: number;
}
