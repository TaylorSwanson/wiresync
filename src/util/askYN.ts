// User must enter y/n here

import askQuestion from "./askQuestion";

export = async function askYN(query: string): Promise<boolean> {
  let answer = "";
  while (answer !== "n" && answer !== "y") {
    answer = await askQuestion(query);
    answer = answer.toLowerCase().trim();
  }

  return Promise.resolve(answer === "y");
}
