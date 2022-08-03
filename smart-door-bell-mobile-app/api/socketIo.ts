import { io, Socket } from "socket.io-client";
import { API_HOST, _authToken } from ".";
export let socket: Socket;

export const connectToWebSocket = () => {
  if (!socket) {
    socket = io(API_HOST, {
      extraHeaders: {
        client_jwt: _authToken as string,
      },
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }
};
