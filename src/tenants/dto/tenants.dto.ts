import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class TenantDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
