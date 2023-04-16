const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema, "Users");
