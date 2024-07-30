import { NestFactory } from '@nestjs/core';
import { ProcessModule } from './process/process.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(ProcessModule, {});
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
