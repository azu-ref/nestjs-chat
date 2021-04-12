import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Controller, Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { writeFile, readFile } from 'fs';
import { AppService } from './app.service';

// import { db } from '../sockets.js';

interface Msg {
  text: string;
  name: string;
}

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly appService: AppService) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: Msg): void {
    this.server.emit('msgToClient', payload);
    this.appService.updateData(client.id, payload.name);
  }

  async sendMessage(clientId: string) {
    const msg: Msg = {
      name: 'Admin',
      text: 'Hello from Admin console',
    };
    this.server.to(clientId).emit('msgToClient', msg);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.appService.insertData(client.id);
  }
}
