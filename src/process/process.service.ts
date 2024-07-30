import { Injectable, Inject } from '@nestjs/common';
import { Process } from './process.entity';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class ProcessService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}
  private processes: Process[] = [];

  async getAuthToken(restreanerUrl, username, password) {
    try {
      const response = await this.httpService.axiosRef.post(
        `${restreanerUrl}/api/login`,
        {
          username: username,
          password: password,
        },
      );
      this.logger.log('info', `Token recived`);
      return response.data.access_token;
    } catch (error) {
      this.logger.log('error', `Error getting auth token: ${error}`);
    }
  }

  async createStream(
    token: string,
    camera_ip: string,
    channel: number,
    restreamerUrl: string,
    camera_user: string,
    camera_password: string,
  ) {
    {
      try {
        const process_id = `${camera_ip}_${channel}`.replace(/[\W_]+/g, '-');
        const response = await axios.post(
          `${restreamerUrl}/api/v3/process`,
          {
            autostart: true,
            id: process_id,
            input: [
              {
                address: `rtsp://${camera_user}:${camera_password}@${camera_ip}:554/cam/realmonitor?channel=${channel}&subtype=1`,
                id: 'input_0',
                options: [
                  '-fflags',
                  '+genpts',
                  '-thread_queue_size',
                  '512',
                  '-probesize',
                  '5000000',
                  '-analyzeduration',
                  '5000000',
                  '-timeout',
                  '5000000',
                  '-rtsp_transport',
                  'tcp',
                ],
              },
            ],
            limits: {
              cpu_usage: 0,
              memory_mbytes: 0,
              waitfor_seconds: 5,
            },
            options: [
              '-loglevel',
              'level+info',
              '-err_detect',
              'ignore_err',
              '-y',
            ],
            output: [
              {
                address: `{memfs}/${process_id}_{outputid}.m3u8`,
                cleanup: [
                  {
                    pattern: `memfs:/${process_id}**`,
                    purge_on_delete: true,
                  },
                  {
                    max_file_age_seconds: 24,
                    pattern: `memfs:/${process_id}_{outputid}.m3u8`,
                    purge_on_delete: true,
                  },
                  {
                    max_file_age_seconds: 24,
                    max_files: 12,
                    pattern: `memfs:/${process_id}_{outputid}_**.ts`,
                    purge_on_delete: true,
                  },
                  {
                    max_file_age_seconds: 24,
                    pattern: `memfs:/${process_id}.m3u8`,
                    purge_on_delete: true,
                  },
                ],
                id: 'output_0',
                options: [
                  '-dn',
                  '-sn',
                  '-map',
                  '0:0',
                  '-codec:v',
                  'libx264',
                  '-preset:v',
                  'ultrafast',
                  '-b:v',
                  '4096k',
                  '-maxrate:v',
                  '4096k',
                  '-bufsize:v',
                  '4096k',
                  '-r',
                  '25',
                  '-sc_threshold',
                  '0',
                  '-pix_fmt',
                  'yuv420p',
                  '-g',
                  '50',
                  '-keyint_min',
                  '50',
                  '-fps_mode',
                  'auto',
                  '-tune:v',
                  'zerolatency',
                  '-map',
                  '0:0',
                  '-codec:a',
                  'aac',
                  '-b:a',
                  '64k',
                  '-shortest',
                  '-metadata',
                  `title=http://loclahost:8080/${process_id}/oembed.json`,
                  '-metadata',
                  'service_provider=datarhei-Restreamer',
                  '-f',
                  'hls',
                  '-start_number',
                  '0',
                  '-hls_time',
                  '2',
                  '-hls_list_size',
                  '6',
                  '-hls_flags',
                  'append_list+delete_segments+program_date_time+temp_file',
                  '-hls_delete_threshold',
                  '4',
                  '-hls_segment_filename',
                  `{memfs}/${process_id}_{outputid}_%04d.ts`,
                  '-master_pl_name',
                  `${process_id}.m3u8`,
                  '-master_pl_publish_rate',
                  '2',
                  '-method',
                  'PUT',
                ],
              },
            ],
            reconnect: true,
            reconnect_delay_seconds: 15,
            reference: `${process_id}`,
            stale_timeout_seconds: 30,
            type: 'ffmpeg',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        this.logger.log(
          'info',
          `Stream created successfully with ID ${process_id}}`,
        );
      } catch (error) {
        this.logger.log('error', `Error creating stream: ${error}`);
      }
    }
  }

  async createSnapshot(token, camera_ip, channel, url) {
    try {
      const process_id = `${camera_ip}_${channel}`.replace(/[\W_]+/g, '-');
      const response = await axios.post(
        `${url}/api/v3/process`,
        {
          autostart: true,
          id: `${process_id}_snapshot`,
          input: [
            {
              address: `{memfs}/${process_id}.m3u8`,
              id: 'input_0',
              options: [],
            },
          ],
          options: ['-err_detect', 'ignore_err'],
          output: [
            {
              address: `{memfs}/${process_id}.jpg`,
              cleanup: [
                {
                  pattern: `memfs:/${process_id}.jpg`,
                  purge_on_delete: true,
                },
              ],
              id: 'output_0',
              options: ['-vframes', '1', '-f', 'image2', '-update', '1'],
            },
          ],
          reconnect: true,
          reconnect_delay_seconds: 60,
          reference: `${process_id}`,
          stale_timeout_seconds: 30,
          type: 'ffmpeg',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      this.logger.log(
        'info',
        `Snapshot process created successfully with ID ${process_id}`,
      );
    } catch (error) {
      this.logger.log('error', `Error creating snaphot process: ${error}`);
    }
  }

  async getProcesses(token, url) {
    try {
      const response = await axios.get(`${url}/api/v3/process`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      this.logger.log('error', `Error getting processes: ${error}`);
    }
  }

  async deleteProcess(token, restreamerUrl, process_id) {
    try {
      const response = await axios.delete(
        `${restreamerUrl}/api/v3/process/${process_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      this.logger.log('info', `Process with ID ${process_id} deleted`);
      return response;
    } catch (error) {
      this.logger.log('error', `Error deleting processes: ${error}`);
    }
  }

  processesToList(processes) {
    const ids = [];
    if (processes !== null) {
      for (const key in processes) {
        if (processes[key] !== null && processes[key].id) {
          if (!ids.includes(processes[key].id)) {
            ids.push(processes[key].id);
          }
        }
      }
    }
    return ids;
  }

  findAll(): Process[] {
    return this.processes;
  }

  delete(id: string): void {
    this.processes = this.processes.filter((process) => process.id !== id);
  }

  async isProcessExists(token, process_id, url) {
    try {
      const processes = await this.getProcesses(token, url);
      return processes.some((process) => process.id === process_id);
    } catch (error) {
      this.logger.log('error', `Error checking if process exists: ${error}`);
    }
  }
}
