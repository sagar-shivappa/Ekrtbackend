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
router.post("/login", postLoginUser);

//Add route to Get all products
router.get("/products", getAllProducts);

//Add route to Get a user cart items by userid
router.get("/cart/:user_id", getCartItemsByUserId);

//Add route to Add products to the cart
router.post("/cart", addToCart);

//Add route to Delete a product by product_id
router.delete("/cart/:user_id/:product_id", removeFromCart);

module.exports = router;
