import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';

@Module({
  imports: [],
  exports: [AppGateway],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
