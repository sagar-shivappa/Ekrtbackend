const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* This is creating a new schema for the product model. */
const userSchema = new Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
