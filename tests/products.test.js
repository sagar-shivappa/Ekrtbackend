const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

jest.mock("jsonwebtoken");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true });

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

  const product2 = new Product({
    product_name: "Swim Board",
    product_id: 431,
    product_description: "Sports Running Shoes",
    price: 990,
    discount_percentage: 5,
    image: "13000",
    product_brand: "Nivia",
  });
  await product2.save();
});

/* Close the MongoDB in-memory server and database after all tests. */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("GET /products", () => {
  it("should validate the user and return 201", async () => {
    const response = await request(app)
      .get("/products")
      .set("authorization", "Bearer valid");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
  it("should return no token found as not AUthorization is set", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("No token found");
  });

  it("should throw a message for INVALID Token", async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const response = await request(app)
      .get("/products")
      .set("authorization", "Bearer invalid");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid token");
  });
});
