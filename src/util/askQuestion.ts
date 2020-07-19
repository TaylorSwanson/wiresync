// Allows user to enter values

const readline = require('readline');

export = function askQuestion(query): Promise<string>{
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query.trim() + " ", ans => {
    rl.close();
    resolve(ans);
  }));
}
