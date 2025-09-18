const express = require("express");
const router = express.Router();

const db = require('../db/queries.js')

router.get("/", (req, res) => {
  res.render("form");
});

router.post("/", async (req, res) => {
  const { user, text } = req.body;
  //req.app.locals.messages.push({ user, text, added: new Date() });
  await db.insertMsg(text,user,new Date())
  res.redirect("/");
});

module.exports = router;
