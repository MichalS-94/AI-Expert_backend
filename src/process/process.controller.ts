import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  HttpException,
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as morgan from 'morgan';
import { Observable } from 'rxjs';

// Morgan middleware interceptor
class MorganInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    morgan('combined', {
      stream: {
        write: (message: string) => console.log(message.trim()),
      },
    })(req, res, () => {});
    return next.handle();
  }
}

@UseInterceptors(MorganInterceptor)
@Controller('process')
export class ProcessController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly processService: ProcessService,
  ) {}

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

  @Delete('/removeProcess')
  async removeProcess(
    @Body()
    authDetails: {
      restreamerUrl: string;
      username: string;
      password: string;
      process_id: string;
    },
  ) {
    try {
      const token = await this.processService.getAuthToken(
        authDetails.restreamerUrl,
        authDetails.username,
        authDetails.password,
      );

      const exists = await this.processService.isProcessExists(
        token,
        authDetails.process_id,
        authDetails.restreamerUrl,
      );
      if (exists) {
        const response = await this.processService.deleteProcess(
          token,
          authDetails.restreamerUrl,
          authDetails.process_id,
        );
        return {
          status: response.status,
          message: `Process with ID ${authDetails.process_id} deleted`,
        };
      } else {
        this.logger.log(
          'warn',
          `Process with ID ${authDetails.process_id} does not exist`,
        );
        throw new HttpException(
          `Process with ID ${authDetails.process_id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      this.logger.log('error', `Error removing processes: ${error}`);
      throw error;
    }
  }
}
