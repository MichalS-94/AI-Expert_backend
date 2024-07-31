import { NestFactory } from '@nestjs/core';
import { ProcessModule } from './process/process.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(ProcessModule, {});
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.use(
    morgan('common', {
      stream: {
        write: (message) => {
          logger.log(message);
        },
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
