import { AppModule } from './app.module';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222', // Replace with your NATS server URL if different
    },
  };
  app.connectMicroservice(microserviceOptions);

  app.useLogger(logger);
  app.use(
    morgan('common', {
      stream: {
        write: (message) => {
          logger.log('info', message);
        },
      },
    }),
  );

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
