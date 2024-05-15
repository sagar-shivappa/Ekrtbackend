const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* This is creating a new schema for the product model. */
const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_id: {
      type: Number,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount_percentage: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    product_brand: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
