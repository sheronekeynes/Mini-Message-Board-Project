const express = require("express");
const app = express();
const path = require("node:path");
const port = process.env.PORT || 3000;

require("dotenv").config();

const router = express.Router();

const sendMsgRouter = require("./routes/sendMsg");

const db = require("./db/queries.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const messages = await db.getMsg();
  console.log(messages);
  res.render("index", { messages });
});

app.use("/new", sendMsgRouter);

// initialize server
app.listen(port, (error) => {
  if (error) {
    console.log("OOPS! something went wrong", error);
    return;
  }
  console.log("Server listening at port: ", port);
});
