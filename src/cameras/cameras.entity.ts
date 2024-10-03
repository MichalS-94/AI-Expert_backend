import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tenant } from '../tenants/tenants.entity.js';

@Entity('Cameras')
export class Camera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  user: string;

  @Column()
  password: string;

  @Column()
  channel: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.cameras)
  tenant: Tenant;
}
