import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProcessModule } from './process/process.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
