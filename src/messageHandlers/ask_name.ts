// Returns hostname of this server

import os from "os";

const xxp = require("xxp");

export = function({ header, content, socket }) {
  const packet = xxp.packetFactory.newPacket({
    header: {
      type: "network_reply_generic",
      "xxp__responseto": header["xxp__packetid"]
    },
    content: {
      name: os.hostname()
    }
  }).packet;

  socket.write(packet);
};
