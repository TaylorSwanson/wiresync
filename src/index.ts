#!/usr/bin/env node
// Entrypoint that handles cli messages

import chalk from "chalk";
import path from "path";
import execCommands from "./commands";
import { startServer } from "./server";

function extractCommands() {
  // Extract commands
  let commands: Array<string> = [];
  
  process.argv.forEach(arg => {
    arg = path.basename(arg.trim().toLowerCase());
    if (!arg.length) return;
    if (arg === "wiresync") return;
    if (arg === "node") return;

    commands.push(arg);
  });

  return commands;
}


function executeMethod(method: string, commands: Array<string>) {
  // Check if we have this method
  if (!execCommands.hasOwnProperty(method)) {
    if (method)
      console.log(chalk.red(`Could not find command '${method}'\n`));

    // Execute the help method automatically if it doesn't exist
    execCommands["help"]();

    process.exit(1);
  }

  execCommands[method](commands);
}


function main() {

  // Determine what the user wants
  const commands = extractCommands();
  const method = commands[0];

  // Show only commands to the call that are relevant, use an array copy to splice
  const commandsCopy = [...commands];
  const callCommands = commandsCopy.splice(1);
  executeMethod(method, callCommands);
}

main();
startServer();
