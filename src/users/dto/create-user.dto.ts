import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'Users password',
  })
  password: string;

  @ApiProperty({ example: 'admin', description: 'The role of the user' })
  @IsString()
  role: string;
}
