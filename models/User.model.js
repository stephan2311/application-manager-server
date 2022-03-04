const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: String,
    address: {
      street: String,
      city: String,
      zip: String,
      country: String,
    },
    companies: [{type: Schema.Types.ObjectId, ref: 'Company'}]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
