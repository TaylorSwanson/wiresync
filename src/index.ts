// Entrypoint that handles cli messages

import * as chalk from "chalk";


function main() {
  if (process.argv[0].trim().toLowerCase() != "wiresync") {
    // console.log(chalk.red(`Unknown command ${process.argv[0]}`));
    console.log(`Unknown command ${process.argv[0]}`);
    process.exit(1);
  }
  
  // Extract commands
  let commands: Array<String> = [];
  
  process.argv.forEach(arg => {
    arg = arg.trim().toLowerCase();
    if (!arg.length) return;
    if (arg === "wiresync") return;

    commands.push(arg);
  });

  console.log("Commands", commands);
}

main();
