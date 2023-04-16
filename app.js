const express = require("express");

const app = express();

const mongoose = require("mongoose");

const auth = require("./routes/auth");

const dotenv = require("dotenv");

dotenv.config();

const port = 3000;

app.use(express.json());

mongoose.connect(process.env.DB_Url).then((value) => {
  console.log("DB Connected");
});

app.use("/api/user", auth);

// app.get("/", (req, res) => {
//   res.send("Hi");

// });

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
