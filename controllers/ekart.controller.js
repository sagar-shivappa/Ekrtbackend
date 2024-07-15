const User = require("../models/user.model");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const jwt = require("jsonwebtoken");

const postLoginUser = async (req, res) => {
  //  Complete this Function
  try {
    const user = new User(req.body);
    if (user.password && user.user_name) {
      const data = await User.findOne(
        {
          user_name: user.user_name,
          password: user.password,
        },
        { password: 0 }
      );
      if (data) {
        // Generate JWT token
        const token = await jwt.sign({ data }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(201).send({ user_name: user.user_name, token });
      } else {
        res.status(403).send({ message: "User Not found" });
      }
    } else {
      res.status(400).send("Validation Error");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllProducts = async (req, res) => {
  //  Complete this Function
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.status(200).send(products);
    } else {
      res.status(204).send("No products found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getCartItemsByUserId = async (req, res) => {
  //  Complete this Function
  try {
    const cartItems = await Cart.findOne({ user_id: req.params.user_id });
    if (cartItems) {
      res.status(200).send(cartItems);
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addToCart = async (req, res) => {
  //  validate the product if already in the cart list, if not present, add it to the user id
  try {
    const cartItems = await Cart.findOne({
      user_id: req.body.user_id,
      "products.product_id": req.body.product_id,
    });

    if (cartItems) {
      res.status(400).send("Product Already in the CART");
    } else {
      //Get the product using product_id
      const product = await Product.findOne({
        product_id: req.body.product_id,
      });
      if (product) {
        await Cart.findOneAndUpdate(
          { user_id: req.body.user_id },
          { $push: { products: product } },
          { returnOriginal: true }
        );
        res.status(201).send("Successfully Added to CART");
      } else {
        res.status(400).send("Invalid Product Information");
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const removeFromCart = async (req, res) => {
  //  Complete this Function // Unable to remove a element from the products list --- checking

  const userId = req.params.user_id;
  const productId = req.params.product_id;
  //Get the available products in the cart
  const productsList = await Cart.findOne(
    { user_id: userId },
    { products: 1, _id: 0 }
  );
  //remove the desired product from the list
  const updatedCart = productsList.products.filter(
    (item) => item.product_id != productId
  );
  //Update the cart asper the new product list
  if (productsList.products.length == updatedCart.length) {
    res.status(404).send("Product not found");
  } else {
    Cart.updateOne({ user_id: userId }, { $set: { products: updatedCart } })
      .then((data) => {
        res.status(201).send("Product Removed Successfully");
      })
      .catch((error) => res.status(500).send(error));
  }
};

module.exports = {
  postLoginUser,
  getAllProducts,
  getCartItemsByUserId,
  removeFromCart,
  addToCart,
};
