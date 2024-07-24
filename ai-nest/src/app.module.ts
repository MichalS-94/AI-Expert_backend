import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [ProcessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
