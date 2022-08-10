import * as readline from 'node:readline';
import { stdin, stdout } from 'process';

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

export const getUserInput = async (question: string) => {
  return new Promise((res, _rej) => {
    rl.question(question, (answer) => {
      res(answer);
    });
  })
    .then((answer) => {
      return answer;
    })
    .catch((err) => {
      console.log(err);
    });
};
