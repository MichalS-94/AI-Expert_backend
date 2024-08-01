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
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('process')
export class ProcessController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly processService: ProcessService,
  ) {}

  @Get()
  async listProcesses(
    @Body()
    authDetails: {
      restreamerUrl: string;
      username: string;
      password: string;
    },
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
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProcess(
    @Body()
    processDetails: {
      camera_ip: string;
      channel: number;
      restreamerUrl: string;
      camera_user: string;
      camera_password: string;
      username: string;
      password: string;
    },
  ) {
    const token = await this.processService.getAuthToken(
      processDetails.restreamerUrl,
      processDetails.username,
      processDetails.password,
    );
    return this.processService.createProcess(
      token,
      processDetails.camera_ip,
      processDetails.channel,
      processDetails.restreamerUrl,
      processDetails.camera_user,
      processDetails.camera_password,
    );
  }

  @Delete(':process_id')
  @HttpCode(HttpStatus.OK)
  async deleteProcess(
    @Param('process_id') process_id: string,
    @Body()
    authDetails: {
      restreamerUrl: string;
      username: string;
      password: string;
    },
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
      this.logger.log('error', `Error removing processes: ${error}`);
      throw error;
    }
  }

  @Get(':process_id/streamUrl')
  @HttpCode(HttpStatus.OK)
  async getHlsStream(
    @Param('process_id') process_id: string,
    @Body()
    authDetails: {
      restreamerUrl: string;
      username: string;
      password: string;
    },
  ) {
    return authDetails.restreamerUrl + '/memfs/' + process_id + '.m3u8';
  }
}
