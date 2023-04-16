const express = require("express");

const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");

//Validation
const yup = require("yup");

const userschema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

router.post("/register", async (req, res) => {
  // Validate the data
  try {
    let uservalidate = await userschema.validateSync(req.body);
    console.log(uservalidate);
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
      res.json("Data Saved Successfully")
    } else {
      res.status(400).send("Email Already Exists");
    }
  } catch (error) {
    res.status(403).send(error.errors);
    console.log(error.errors);
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!!user) {
    let PasswordisTrue = await bcrypt.compare(req.body.password, user.password);

    if (PasswordisTrue) {
      res.send("Successfully Logged In");
    } else {
      res.status(403).send("Invalid Password");
    }
  } else {
    res.status(403).send("User not Found");
  }
});

module.exports = router;
