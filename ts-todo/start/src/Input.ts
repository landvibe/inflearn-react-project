import readline from 'readline';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function waitForInput(msg: string) {
  return new Promise<string>(res =>
    readlineInterface.question(msg, key => {
      res(key);
    }),
  );
}
