import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProcessService } from './process.service';
//import { HttpModule } from '@nestjs/axios';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}
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
      //logger.log('error', `Error listing processes: ${error}`);
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
      return processList;
      //logger.log('info', `Ongoing processes: ${JSON.stringify(processList)}`);
    } catch (error) {
      //logger.log('error', `Error listing processes: ${error}`);
    }
  }

  @Post('/createProcess')
  @HttpCode(HttpStatus.CREATED)
  async createProcess(
    @Body()
    processDetails: {
      camera_ip: string;
      channel: number;
      url: string;
      camera_user: string;
      camera_password: string;
      username: string;
      password: string;
    },
  ) {
    return this.processService.createStream(
      processDetails.camera_ip,
      processDetails.channel,
      processDetails.url,
      processDetails.camera_user,
      processDetails.camera_password,
      processDetails.username,
    );
  }
}
