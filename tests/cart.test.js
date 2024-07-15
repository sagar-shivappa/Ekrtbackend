const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

const { MongoMemoryServer } = require("mongodb-memory-server");

require("dotenv").config();

jest.mock("jsonwebtoken");

let mongoServer;

/* Establish a MongoDB in-memory server before all tests. */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true });

  const Cart = mongoose.model("Cart");
  const user1 = new Cart({
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
  });
  await user1.save();

  const Product = mongoose.model("Products");
  const product1 = new Product({
    product_name: "Swim caps",
    product_id: 198,
    product_description: "Sports Running Shoes",
    price: 767,
    discount_percentage: 5,
    image: "13000",
    product_brand: "Nivia",
  });
  await product1.save();
});

/* Close the MongoDB in-memory server and database after all tests. */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("CART Details", () => {
  it("should get all the cart items of a particular user id 1", async () => {
    const res = await request(app)
      .get("/cart/1")
      .set("authorization", "Bearer valid");
    expect(res.body.user_id).toBe(1);
    expect(res.body.products.length).toBe(2);
  });

  it("should return 404 for non existing user ID", async () => {
    const res = await request(app)
      .get("/cart/1000")
      .set("authorization", "Bearer valid");
    expect(res.statusCode).toBe(404);
  });

  it("should add new product to the cart for user 1", async () => {
    const res = await request(app)
      .post("/cart")
      .send({
        user_id: 1,
        product_id: 198,
      })
      .set("authorization", "Bearer valid");

    expect(res.statusCode).toBe(201);
    expect(res.text).toBe("Successfully Added to CART");
  });

  it("should not be able to add product which is already in the cart", async () => {
    const res = await request(app)
      .post("/cart")
      .send({
        user_id: 1,
        product_id: 123,
      })
      .set("authorization", "Bearer valid");

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Product Already in the CART");
  });

  it("should not be able to add product, if the product information is invalid", async () => {
    const res = await request(app)
      .post("/cart")
      .send({
        user_id: 1,
        product_id: 29832832,
      })
      .set("authorization", "Bearer valid");

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Invalid Product Information");
  });

  it("should be able to successfully remove item from the cart", async () => {
    const res = await request(app)
      .delete("/cart/1/123")
      .set("authorization", "Bearer valid");

    expect(res.statusCode).toBe(201);
    expect(res.text).toBe("Product Removed Successfully");
  });

  it("should throw error if removing unable product id", async () => {
    const res = await request(app)
      .delete("/cart/1/343434343434")
      .set("authorization", "Bearer valid");

    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("Product not found");
  });
});
