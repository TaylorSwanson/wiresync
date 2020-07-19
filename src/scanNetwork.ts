// Scans the local network for running wiresync servers
// Feed it an array like [192, 168, 1]
import net, { Socket } from "net";

import ProgressBar from "progress";
import * as xxp from "xxp";

export = async function scanNetwork(startingAddressString: string) {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const total = 255 * 2;

    const bar = new ProgressBar(":bar :percent", { total });
  
    const foundServers: Array<object> = [];

    for (var i = 0; i < 256; i++) {
      const host = `${startingAddressString}${i}`;

      const socket: Socket = net.createConnection({
        port: 43511,
        host,
        timeout: 5000
      });

      bar.tick();

      socket.on("connect", () => {
        // We found a server, get name
        const packet = xxp.packetFactory.newPacket({
          content: {},
          header: {
            type: "ask_name"
          }
        }).packet;

        socket.write(packet);
        
        // Listen for response
        xxp.packetDecoder(socket, ({ header, content, socket }) => {
          if (header.type == "reply_name") {
            foundServers.push({
              name: content,
              host
            });

            socket.end();
          } else {
            console.log("Unexpected reply type to name request:", header.type);
          }
        })
      });

      socket.on("timeout", () => {
        // We need to close it ourselves
        socket.destroy();
      });

      socket.on("close", () => {
        bar.tick();
        completed++;

        // Resolve once all connections have been closed
        if (completed >= total) {
          resolve(foundServers);
        }
      });
    }
  });
};
