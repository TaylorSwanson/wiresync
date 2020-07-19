// List files in requested directory

import fs from "fs";
import path from "path";

const contents: string[] = fs.readdirSync(__dirname);

const commands: any = {};

contents.forEach(file => {
  if (file.endsWith(".map")) return;
  if (file.startsWith("index")) return;

  const commandName: string = path.basename(file, ".js");

  // Load the file into available commands
  commands[commandName] = require(path.join(__dirname, file));

});

export default commands;
