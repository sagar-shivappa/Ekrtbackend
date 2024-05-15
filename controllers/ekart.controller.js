const User = require("../models/user.model");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const jwt = require("jsonwebtoken");

const postLoginUser = async (req, res) => {
  //  Complete this Function
};

const getAllProducts = async (req, res) => {
  //  Complete this Function
};

const getCartItemsByUserId = async (req, res) => {
  //  Complete this Function
};

const addToCart = async (req, res) => {
  //  Complete this Function
};

const removeFromCart = async (req, res) => {
  //  Complete this Function
};

module.exports = {
  postLoginUser,
  getAllProducts,
  getCartItemsByUserId,
  removeFromCart,
  addToCart,
};
