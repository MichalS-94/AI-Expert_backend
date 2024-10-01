import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { Camera } from '../cameras/cameras.entity';

@Entity('Tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  address: string;

  @OneToMany(() => Camera, (camera) => camera.tenant)
  cameras: Camera[];
}
