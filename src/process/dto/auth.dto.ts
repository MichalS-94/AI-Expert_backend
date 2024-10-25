import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'http://restreamer.url',
    description: 'URL of the restreamer',
  })
  restreamerUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user', description: 'Username for authentication' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'Password for authentication',
  })
  password: string;
}
