import { NestFactory } from '@nestjs/core';
import { ProcessModule } from './process/process.module';

async function bootstrap() {
  const app = await NestFactory.create(ProcessModule, {});
  await app.listen(3000);
}
bootstrap();
