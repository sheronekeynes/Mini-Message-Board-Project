const pool = require("./pool");

async function getMsg() {
  let { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMsg(text, user, added) {
  await pool.query(
    "INSERT INTO messages(text,username,added) VALUES($1,$2,$3)",
    [text, user, added]
  );
}

module.exports = {
  getMsg,
  insertMsg,
};
