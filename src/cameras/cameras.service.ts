import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camera } from './cameras.entity';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { Tenant } from '../tenants/tenants.entity';

@Injectable()
export class CamerasService {
  constructor(
    @InjectRepository(Camera)
    private camerasRepository: Repository<Camera>,

    @InjectRepository(Tenant)
    private tenantsRepository: Repository<Tenant>,
  ) {}

  async create(createCameraDto: CreateCameraDto): Promise<Camera> {
    const { tenantId, ...cameraData } = createCameraDto;

    const tenant = await this.tenantsRepository.findOne({
      where: { id: Number(tenantId) },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
    }

    // Create the camera entity and associate it with the tenant
    const camera = this.camerasRepository.create({
      ...cameraData,
      tenant,
    });

    return this.camerasRepository.save(camera);
  }

  async findAll(): Promise<Camera[]> {
    return this.camerasRepository.find();
  }

  async findOne(id: number): Promise<Camera> {
    return this.camerasRepository.findOneBy({ id });
  }

  async update(id: number, updateCameraDto: UpdateCameraDto): Promise<Camera> {
    await this.camerasRepository.update(id, updateCameraDto);
    return this.camerasRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.camerasRepository.delete(id);
  }
}
