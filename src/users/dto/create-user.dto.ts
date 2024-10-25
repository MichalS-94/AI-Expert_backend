import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Users password',
  })
  password: string;

  @ApiProperty({ example: 'admin', description: 'The role of the user' })
  role: string;
}
