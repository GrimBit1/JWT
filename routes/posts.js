const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");


router.get("/",verify ,(req, res) => {
  res.json("You are logged in");
});

module.exports = router;
