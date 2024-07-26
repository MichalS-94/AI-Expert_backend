import { NestFactory } from '@nestjs/core';
import { ProcessModule } from './process/process.module';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(ProcessModule, {
    logger: WinstonModule.createLogger({
      // options (same as WinstonModule.forRoot() options)
    }),
  });
  await app.listen(3000);
}
bootstrap();
