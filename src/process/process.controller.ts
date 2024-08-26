import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Delete,
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreateStreamDto } from './dto/create-stream.dto';
import { authDto } from './dto/auth.dto';

@Controller('process')
export class ProcessController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly processService: ProcessService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async listProcesses(
    @Body()
    authDetails: authDto,
  ) {
    try {
      const token = await this.processService.getAuthToken(
        authDetails.restreamerUrl,
        authDetails.username,
        authDetails.password,
      );
      const processes = await this.processService.getProcesses(
        token,
        authDetails.restreamerUrl,
      );
      const processList = this.processService.processesToList(processes);
      this.logger.log(
        'info',
        `Ongoing processes: ${JSON.stringify(processList)}`,
      );
      return processList;
    } catch (error) {
      this.logger.log('error', `Error listing processes: ${error}`);
      throw new HttpException(
        {
          status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to list processes',
          message: error.message,
        },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createProcess(
    @Body()
    processDetails: CreateStreamDto,
  ) {
    try {
      const token = await this.processService.getAuthToken(
        processDetails.restreamerUrl,
        processDetails.username,
        processDetails.password,
      );
      const process = await this.processService.createProcess(
        token,
        processDetails.camera_ip,
        processDetails.channel,
        processDetails.restreamerUrl,
        processDetails.camera_user,
        processDetails.camera_password,
      );
      return process;
    } catch (error) {
      this.logger.log('error', `Error creating process: ${error}`);
      throw new HttpException(
        'Failed to create process',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':process_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async deleteProcess(
    @Param('process_id') process_id: string,
    @Body()
    authDetails: authDto,
  ) {
    try {
      const token = await this.processService.getAuthToken(
        authDetails.restreamerUrl,
        authDetails.username,
        authDetails.password,
      );

      const exists = await this.processService.doesProcessExist(
        token,
        process_id,
        authDetails.restreamerUrl,
      );
      if (exists) {
        const response = await this.processService.deleteProcess(
          token,
          authDetails.restreamerUrl,
          process_id,
        );
        return {
          status: response.status,
          message: `Process with ID ${process_id} deleted`,
        };
      } else {
        this.logger.log('warn', `Process with ID ${process_id} does not exist`);
        throw new HttpException(
          `Process with ID ${process_id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.log(
          'error',
          `HTTP Error removing process: ${error.message}`,
        );
        throw error;
      } else {
        throw new HttpException(
          error.response?.data || 'Failed to remove process',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':process_id/streamUrl')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getHlsStream(
    @Param('process_id') process_id: string,
    @Body()
    authDetails: authDto,
  ) {
    try {
      const streamUrl =
        authDetails.restreamerUrl + '/memfs/' + process_id + '.m3u8';
      return { streamUrl };
    } catch (error) {
      this.logger.log('error', `Error getting stream URL: ${error}`);
      throw new HttpException(
        'Failed to get stream URL',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
