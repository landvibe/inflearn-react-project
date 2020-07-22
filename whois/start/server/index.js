const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE);
app.get('/user/search', (req, res) => {
  setTimeout(() => {
    const keyword = req.query.keyword;
    db.all(
      `SELECT * FROM user where name like '%${keyword}%' or department like '%${keyword}%' or tag like '%${keyword}%'`,
      [],
      (err, rows) => {
        if (err) {
          throw err;
        }
        res.send(makeResponse({ data: rows }));
      },
    );
  }, 1);
});
app.get('/history', (req, res) => {
  setTimeout(() => {
    const { name, page = 0 } = req.query;
    // @ts-ignore
    const pagination = `limit ${PAGING_SIZE} offset ${PAGING_SIZE * page}`;
    const sql = name
      ? `SELECT * FROM history where name='${name}' order by date DESC ${pagination}`
      : `SELECT * FROM history order by date DESC ${pagination}`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      db.all('SELECT count(*) as totalCount FROM history', [], (err, rows2) => {
        const totalCount = rows2[0].totalCount;
        res.send(makeResponse({ data: rows, totalCount }));
      });
    });
  }, 1);
});
app.post('/user/update', (req, res) => {
  setTimeout(() => {
    const { key, name, value, oldValue } = req.body;
    const sql = `UPDATE user SET ${key} = ? WHERE name = ?`;
    db.run(sql, [value, name], function (err) {
      if (err) {
        return console.error(err.message);
      }

      const date = new Date(new Date().getTime() + 9 * 3600 * 1000);
      const iso = date.toISOString();
      const dateStr = `${iso.substr(0, 10)} ${iso.substr(11, 8)}`;
      const editor = req.cookies.token || 'unknown';
      const history = {
        editor,
        name,
        column: key,
        before: oldValue,
        after: value,
        date: dateStr,
      };
      const sql = `INSERT INTO history(editor, name, column, before, after, date) VALUES (?,?,?,?,?,?)`;
      db.run(
        sql,
        [
          history.editor,
          history.name,
          history.column,
          history.before,
          history.after,
          history.date,
        ],
        function (err) {
          if (err) {
            return console.error(err.message);
          }
          history.id = this.lastID;
          res.send(makeResponse({ data: { history } }));
        },
      );
    });
  }, 1);
});

app.get('/auth/user', (req, res) => {
  setTimeout(() => {
    const name = req.cookies.token;
    res.send(makeResponse({ data: { name } }));
  }, 1);
});

app.post('/auth/login', (req, res) => {
  setTimeout(() => {
    const { name } = req.body;
    db.all(`SELECT * FROM user where name='${name}'`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length) {
        res.cookie('token', name, {
          maxAge: COOKIE_MAX_AGE,
          httpOnly: true,
        });
        res.send(makeResponse({ data: { name } }));
      } else {
        res.send(
          makeResponse({
            resultCode: -1,
            resultMessage: '존재하지 않는 사용자입니다.',
          }),
        );
      }
    });
  }, 1);
});

app.get('/auth/logout', (req, res) => {
  setTimeout(() => {
    res.cookie('token', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.send(makeResponse({}));
  }, 1);
});

app.post('/auth/signup', (req, res) => {
  setTimeout(() => {
    const { email } = req.body;
    if (!email.includes('@')) {
      res.send(
        makeResponse({
          resultCode: -1,
          resultMessage: '이메일 형식이 아닙니다.',
        }),
      );
      return;
    }
    const name = email.substr(0, email.lastIndexOf('@'));
    db.all(`SELECT * FROM user where name='${name}'`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      console.log('rows', rows, rows[0]);
      if (rows.length) {
        res.send(
          makeResponse({
            resultCode: -1,
            resultMessage: '이미 존재하는 사용자입니다.',
          }),
        );
      } else {
        const sql = `INSERT INTO user(name, department, tag) VALUES (?,?,?)`;
        db.run(sql, [name, '소속없음', ''], function (err) {
          if (err) {
            return console.error(err.message);
          }
          res.cookie('token', name, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
          res.send(makeResponse({ data: { name } }));
        });
      }
    });
  }, 1);
});

const COOKIE_MAX_AGE = 3600000 * 24 * 14;
const PAGING_SIZE = 20;

/**
 *
 * @param {object} param
 * @param {object=} param.data
 * @param {number=} param.totalCount
 * @param {number=} param.resultCode
 * @param {string=} param.resultMessage
 */
function makeResponse({ data, totalCount, resultCode, resultMessage }) {
  return {
    data,
    totalCount,
    resultCode: resultCode || 0,
    resultMessage: resultMessage || '',
  };
}

const PORT = 3001;
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
