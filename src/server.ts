// Main server

import net, { Socket } from "net";

import xxp from "xxp";
import messageHandlers from "./messageHandlers";

export function startServer() {
  const server = net.createServer((socket: Socket) => {
    // Client connected
    xxp.packetDecoder(socket, messageHandlers);
  });
  
  server.on("error", err => {
    throw err;
  });
  
  server.listen(43511);
}
