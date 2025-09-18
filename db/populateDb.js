const { Client } = require("pg");

require("dotenv").config();

const message = {
  text: "Hey!!",
  username: "Luffy",
  added: new Date(),
};

const SQL_CREATE = `CREATE TABLE IF NOT EXISTS 
            messages(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                    text VARCHAR(255),
                    username VARCHAR(50),
                    added TIMESTAMP NOT NULL) `;

const SQL_INSERT = `   INSERT INTO messages(text,username,added)
            VALUES ($1,$2,$3)
                    
`;

async function main() {
  console.log("seeding");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // required by Railway
  });

  await client.connect();
  await client.query(SQL_CREATE);
  await client.query(SQL_INSERT, [
    message.text,
    message.username,
    message.added,
  ]);
  await client.end();

  console.log("done");
}

main();
