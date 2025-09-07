const express = require("express");
const app = express();
const path = require("node:path");
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// users 
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


app.get("/", (req, res) => {
  res.render("index", { messages:messages });
});

// initialize server
app.listen(port, (error) => {
  if (error) {
    console.log("OOPS! something went wrong", error);
    return;
  }
  console.log("Server listening at port: ", port);
});
