const { Client } = require("pg");

require("dotenv").config();


const message = {
  text: "Hey!!",
  user: "Luffy",
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
    connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`,
  });

  await client.connect();
  await client.query(SQL_CREATE);
  await client.query(SQL_INSERT, [message.text, message.user, message.added]);
  await client.end();

  console.log("done");
}

main();
