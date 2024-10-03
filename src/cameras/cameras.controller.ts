import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { Camera } from './cameras.entity';
@Controller('cameras')
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Post()
  async create(@Body() createCameraDto: CreateCameraDto): Promise<Camera> {
    console.log('createCameraDto', createCameraDto);
    return this.camerasService.create(createCameraDto);
  }

  @Get()
  async findAll(): Promise<Camera[]> {
    return this.camerasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Camera> {
    return this.camerasService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCameraDto: UpdateCameraDto,
  ): Promise<Camera> {
    return this.camerasService.update(id, updateCameraDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.camerasService.remove(id);
  }
}
