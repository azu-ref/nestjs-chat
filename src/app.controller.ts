import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Socket, Server } from 'socket.io';
import { readFileSync } from 'fs';
import { AppGateway } from './app.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appGateway: AppGateway,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/sockets')
  getSockets(): string {
    const file = readFileSync(`${__dirname}/../sockets.json`);
    return JSON.parse(file.toString());
  }

  @Get('/send/:id')
  sendMessage(@Param() params) {
    this.appGateway.server
      .to(params.id)
      .emit('msgToClient', { text: 'Admin se ha unido', name: 'Admin' });
    return 'Message sended';
  }
}
