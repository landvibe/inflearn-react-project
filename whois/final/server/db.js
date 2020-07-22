const sqlite3 = require('sqlite3');

// const db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE);

const users = [
  ['land', '글로벌웹', '팀장, 웹, 결제, 리액트'],
  ['bono', '글로벌웹', '팀원, 로그인, 작품홈'],
  ['shai', '국내웹', '팀장, 비디오 플레이어, 카톡더보기'],
];
const placeholders = users.map(_ => '(?,?,?)').join(',');
const sql = 'INSERT INTO user(name, department, tag) VALUES ' + placeholders;
db.run(
  sql,
  users.flatMap(_ => _),
  function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows inserted ${this.changes}`);
  },
);

db.close();
