import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/services/auth.service';
import { ClientHomeService } from '../client-home/client-home.service';

@WebSocketGateway({
  allowEIO3: true,
  transports: ['websocket'],
})
export class SocketGateway implements OnGatewayConnection {
  private logger: Logger = new Logger(this.constructor.name);

  @WebSocketServer()
  server;

  constructor(
    private readonly clientHomeService: ClientHomeService,
    private readonly authService: AuthService,
  ) {}
  async handleConnection(socket: Socket) {
    console.log(socket.handshake.headers);
    const { raspberry_pi_cart_key, client_jwt } = socket.handshake.headers;
    if (client_jwt) {
      // isClient
      const clientId = this.authService.getUserIdFromJwt(client_jwt as string);
      if (clientId) {
        console.log({ clientId });
        socket.join(clientId.toString());
        socket.emit('open-door-client-app-notify');
        this.logger.log(`Received connection from client: | ${clientId}`);
        socket.on('disconnect', () => {
          this.logger.log(`Received disconnect from client: | ${clientId}`);
        });
        return;
      }
    } else if (raspberry_pi_cart_key) {
      // isRasspberyy
      const home = await this.clientHomeService.getClientHomeByRaspKey(
        raspberry_pi_cart_key as string,
      );
      if (home) {
        socket.join(raspberry_pi_cart_key as string);
        this.logger.log(
          `Received connection from cart: | ${raspberry_pi_cart_key}`,
        );
        socket.on('disconnect', () => {
          this.logger.log(
            `Received disconnect from cart: | ${raspberry_pi_cart_key}`,
          );
        });
        return;
      }
    }
    this.logger.log(`Received connection from unkown:`);
    socket.disconnect();
  }

  @SubscribeMessage('open-door')
  openHommeDoor(
    @MessageBody() raspberry_pi_cart_key: string,
    @ConnectedSocket() clientSocket: Socket,
  ): void {
    clientSocket.to(raspberry_pi_cart_key).emit('open-door');
  }

  @SubscribeMessage('open-door-client-notify')
  async openDoorClientNotification(@ConnectedSocket() homeSocket: Socket) {
    const { raspberry_pi_cart_key } = homeSocket.handshake.headers;
    const home = await this.clientHomeService.getClientHomeByRaspKey(
      raspberry_pi_cart_key as string,
    );
    if (home) {
      const latestHistory = home.histories[home.histories.length - 1];

      homeSocket
        .to(home.owner.id.toString())
        .emit('open-door-client-app-notify', {
          homeName: home.name,
          imageUrl: latestHistory.imageURL,
          raspberry_pi_cart_key: home.raspberryPiCartKey,
        });
    }
  }
}
