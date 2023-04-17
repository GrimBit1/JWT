const express = require("express");

const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // Validate the data
  try {
    registerValidation(req.body);

    let userAlready = await User.findOne({ email: req.body.email });
    if (!userAlready) {
      const saltRounds = 10;

      let encryptedPassword;

      try {
        encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
      } catch (error) {
        console.log(`Error Occured in Hashing password` + error);
      }

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });
      let userSaved = await user.save();
      res.json("Data Saved Successfully");
    } else {
      res.status(400).send("Email Already Exists");
    }
  } catch (error) {
    res.status(403).send(error.errors ?? error);
  }
});

router.post("/login", async (req, res) => {
  try {
    loginValidation(req.body);
    const user = await User.findOne({ email: req.body.email });

    if (!!user) {
      let PasswordisTrue = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (PasswordisTrue) {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send("Succesfully logged in");
        // console.log(token);
      } else {
        res.status(403).send("Invalid Password");
      }
    } else {
      res.status(403).send("User not Found");
    }
  } catch (error) {
    res.status(403).send(error.errors ?? error);
  }
});

module.exports = router;
