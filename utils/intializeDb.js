// Import Models as below
const Users = require("../models/user.model");
const Products = require("../models/product.model");
const Cart = require("../models/cart.model");

const intializeDB = async () => {
  // Check if data presesent using the model as belwo
  const products = await Products.find();
  if (products.length == 0) {
    // Add all the available products to ekart portal
    const productsArray = [
      {
        product_name: "Miko Shoe",
        product_id: 123,
        product_description: "Sports Running Shoes",
        price: 456,
        discount_percentage: 5,
        image: "13000",
        product_brand: "PumA",
      },
      {
        product_name: "Tennis Balls",
        product_id: 456,
        product_description: "Sports Running Shoes",
        price: 789,
        discount_percentage: 5,
        image: "13000",
        product_brand: "Wilson",
      },
      {
        product_name: "Carrom Board",
        product_id: 767,
        product_description: "Sports Running Shoes",
        price: 9090,
        discount_percentage: 5,
        image: "13000",
        product_brand: "Camel Board",
      },
      {
        product_name: "Umpire Hats",
        product_id: 993,
        product_description: "Sports Running Shoes",
        price: 890,
        discount_percentage: 5,
        image: "13000",
        product_brand: "Nike",
      },
      {
        product_name: "Sciccors",
        product_id: 798,
        product_description: "Sports Running Shoes",
        price: 78,
        discount_percentage: 5,
        image: "13000",
        product_brand: "Addidas",
      },
      {
        product_name: "Swim Board",
        product_id: 431,
        product_description: "Sports Running Shoes",
        price: 990,
        discount_percentage: 5,
        image: "13000",
        product_brand: "Nivia",
      },
      {
        product_name: "Swim caps",
        product_id: 198,
        product_description: "Sports Running Shoes",
        price: 767,
        discount_percentage: 5,
        image: "13000",
        product_brand: "Nivia",
      },
    ];
    productsArray.forEach(async (e) => {
      let product = new Products(e);
      await product.save();
    });
  }

  // Add Uers
  const users = await Users.find();
  if (users.length == 0) {
    // Add all the available products to ekart portal
    const usersArray = [
      {
        user_name: "tester",
        password: "tester123",
        user_id: 1,
      },
      {
        user_name: "doSelect",
        password: "tester123",
        user_id: 2,
      },
      {
        user_name: "developer",
        password: "tester123",
        user_id: 3,
      },
    ];
    usersArray.forEach(async (e) => {
      let user = new Users(e);
      await user.save();
    });
  }

  //Check for cart items, if available in DB, return else, Add new cart items to DB
  const cartItems = await Cart.find();
  if (cartItems.length == 0) {
    const cartItemForUser = [
      {
        user_id: 1,
        products: [
          {
            product_name: "Miko Shoe",
            product_id: 123,
            product_description: "Sports Running Shoes",
            price: 456,
            discount_percentage: 5,
            image: "13000",
            product_brand: "PumA",
          },
          {
            product_name: "Tennis Balls",
            product_id: 456,
            product_description: "Sports Running Shoes",
            price: 789,
            discount_percentage: 5,
            image: "13000",
            product_brand: "Wilson",
          },
        ],
      },
      {
        user_id: 3,
        products: [
          {
            product_name: "Carrom Board",
            product_id: 767,
            product_description: "Sports Running Shoes",
            price: 9090,
            discount_percentage: 5,
            image: "13000",
            product_brand: "Camel Board",
          },
          {
            product_name: "Umpire Hats",
            product_id: 993,
            product_description: "Sports Running Shoes",
            price: 890,
            discount_percentage: 5,
            image: "13000",
            product_brand: "Nike",
          },
        ],
      },
    ];

    cartItemForUser.forEach(async (e) => {
      let cartItem = new Cart(e);
      await cartItem.save();
    });
  }
};

module.exports = {
  intializeDB,
};
