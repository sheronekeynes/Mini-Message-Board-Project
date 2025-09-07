const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("form");
});

router.post("/", (req, res) => {
  const { user, text } = req.body;
  req.app.locals.messages.push({ user, text, added: new Date() });
  res.redirect("/");
});

module.exports = router;
