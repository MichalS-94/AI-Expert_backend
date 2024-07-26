import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
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

  @Get('/getProcessHello')
  getProcessHello(): string {
    return this.processService.getProcessHello();
  }

  @Post('/login')
  async login(
    @Body() authDetails: { url: string; username: string; password: string },
  ) {
    try {
      const token = await this.processService.getAuthToken(
        authDetails.url,
        authDetails.username,
        authDetails.password,
      );
      return token;
    } catch (error) {
      this.logger.log('error', `Error listing processes: ${error}`);
      throw error;
    }
  }

  @Get('/listProcesses')
  async listProcesses(
    @Body() authDetails: { url: string; username: string; password: string },
  ) {
    try {
      const token = await this.processService.getAuthToken(
        authDetails.url,
        authDetails.username,
        authDetails.password,
      );
      console.log(token);
      const processes = await this.processService.getProcesses(
        token,
        authDetails.url,
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

  @Post('/createProcess')
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
    console.log(processDetails);
    const token = await this.processService.getAuthToken(
      processDetails.restreamerUrl,
      processDetails.username,
      processDetails.password,
    );
    return this.processService.createStream(
      token,
      processDetails.camera_ip,
      processDetails.channel,
      processDetails.restreamerUrl,
      processDetails.camera_user,
      processDetails.camera_password,
    );
  }

  @Post('/removeProcess')
  @HttpCode(HttpStatus.CREATED)
  async removeProcess(username, password, process_id, url) {
    try {
      const token = await this.processService.getAuthToken(
        url,
        username,
        password,
      );
      const exists = await this.processService.isProcessExists(
        token,
        process_id,
        url,
      );
      if (exists) {
        await this.processService.deleteProcess(token, url, process_id);
      } else {
        this.logger.log('warn', `Process with ID ${process_id} does not exist`);
      }
    } catch (error) {
      this.logger.log('error', `Error removing processes: ${error}`);
    }
  }
}
