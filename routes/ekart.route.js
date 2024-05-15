const express = require("express");

const {
  getAllProducts,
  getCartItemsByUserId,
  postLoginUser,
  removeFromCart,
  addToCart,
} = require("../controllers/ekart.controller");

const router = express.Router();

//Add route to Post user login credenetails

//Add route to Get all products

//Add route to Get a user cart items by userid

//Add route to Add products to the cart

//Add route to Delete a product by id

module.exports = router;
