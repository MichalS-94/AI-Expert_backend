import { IsString, IsNotEmpty } from 'class-validator';

export class authDto {
  @IsString()
  @IsNotEmpty()
  restreamerUrl: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
