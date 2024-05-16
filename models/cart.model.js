const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* This is creating a new schema for the product model. */
const cartSchema = new Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
