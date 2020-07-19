import askQuestion from "../util/askQuestion";
import askYN from "../util/askYN";
import chalk from "chalk";
import scanNetwork from "../scanNetwork";

const isValidIp = value => (/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(value));

export = async function help(commands: Array<string>) {
  let isNewConnection = false;
  
  if (commands.length == 1) {
    console.log("Configuring an existing connection");
  } else if (commands.length > 1) {
    console.log("Too many arguments, can only configure one connection at a time");
    process.exit(1);
  } else {
    console.log("Creating a new connection");
    isNewConnection = true;
  }

  if (isNewConnection) {
    let name = await askQuestion("Name of new connection:");
    name = name.toLowerCase().trim();

    const knowsAddress = await askYN("Do you know the LAN address of the remote? (y/n):");
    
    if (!knowsAddress) {
      const canScan = await askYN("Do you want to scan your local network for a remote? (y/n):");
      if (!canScan) {
        console.log(chalk.red(`Cannot find a server without scanning network`));
        process.exit(2);
      } else {
        // Ask for range, make sure it's valid
        let range = ""
        while (!isValidIp(range)) {
          range = await askQuestion("Enter address to start scanning at (typically 192.168.0.1 on home networks):");
        }

        const sr = range.split(".");
        const rangeString = `${sr[0]}.${sr[1]}.${sr[2]}.${sr[3]} to ${sr[0]}.${sr[1]}.${sr[2]}.255`

        const confirmScan = await askYN(`Are you sure you are allowed to scan ${rangeString}? (y/n):`);

        if (!confirmScan) {
          console.log(chalk.red("Will not scan the network"));
          process.exit(2);
        }

        console.log("\n");
        const servers = await scanNetwork(`${sr[0]}.${sr[1]}.${sr[2]}.`);

        console.log(`Found ${servers.length} servers`);
      }
    } else {

    }
  } else {

  }
}
