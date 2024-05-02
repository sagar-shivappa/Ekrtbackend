// Import Models as below
const Users = require("../models/user.model");
const Products = require("../models/product.model");

const intializeDB = async () => {
  // Check if data presesent using the model as belwo

  const products = await Products.find();
  if (products.length != 0) {
    return;
  }

  // Add all the available products to ekart portal
  const productsArray = [
    {
      product_name: "Miko Shoe",
      product_description: "Sports Running Shoes",
      price: 456,
      discount_percentage: 5,
      image: "13000",
      product_brand: "PumA",
    },
    {
      product_name: "Tennis Balls",
      product_description: "Sports Running Shoes",
      price: 789,
      discount_percentage: 5,
      image: "13000",
      product_brand: "Wilson",
    },
    {
      product_name: "Carrom Board",
      product_description: "Sports Running Shoes",
      price: 9090,
      discount_percentage: 5,
      image: "13000",
      product_brand: "Camel Board",
    },
    {
      product_name: "Umpire Hats",
      product_description: "Sports Running Shoes",
      price: 890,
      discount_percentage: 5,
      image: "13000",
      product_brand: "Nike",
    },
    {
      product_name: "Sciccors",
      product_description: "Sports Running Shoes",
      price: 78,
      discount_percentage: 5,
      image: "13000",
      product_brand: "Addidas",
    },
    {
      product_name: "Swim Board",
      product_description: "Sports Running Shoes",
      price: 990,
      discount_percentage: 5,
      image: "13000",
      product_brand: "Nivia",
    },
    {
      product_name: "Swim caps",
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

  // Add Uers
  const users = await Users.find();
  if (users.length != 0) {
    return;
  }

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
};

module.exports = {
  intializeDB,
};
