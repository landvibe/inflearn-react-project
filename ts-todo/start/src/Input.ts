import readline from 'readline';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function waitForInput(msg: string) {
  return new Promise(res =>
    readlineInterface.question(msg, name => {
      res(name);
    }),
  );
}
