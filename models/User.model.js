const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    password: String,
    mail: String,
    address: {
      street: String,
      city: String,
      zip: String,
      country: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
