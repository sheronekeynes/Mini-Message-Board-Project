const express = require("express");
const app = express();
const path = require("node:path");
const port = process.env.PORT||3000;

const router = express.Router();

const sendMsgRouter = require("./routes/sendMsg");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// users
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.locals.messages = messages;

app.get("/", (req, res) => {
  res.render("index", { messages: messages });
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
