const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");

require("dotenv").config();

let mongoServer;

/* Connecting to the database before all test. */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true });

  const User = mongoose.model("Users");
  const user1 = new User({
    user_id: 1,
    user_name: "do_select",
    password: "do_select",
  });
  await user1.save();
});

/* Close the MongoDB in-memory server and database after all tests. */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /login", () => {
  it("should successfully login user with 201 status", async () => {
    const res = await request(app).post("/login").send({
      user_name: "do_select",
      password: "do_select",
    });
    expect(res.statusCode).toBe(201);
  });
  it("should return unauthorised for invalid credentails", async () => {
    const res = await request(app).post("/login").send({
      user_name: "no_select",
      password: "no_select",
    });
    expect(res.statusCode).toBe(403);
  });
  it("should throw 400 as user_name field is missing", async () => {
    const res = await request(app).post("/login").send({
      password: "test123",
    });
    expect(res.statusCode).toBe(400);
  });
  it("should throw 400 as password field is missing", async () => {
    const res = await request(app).post("/login").send({
      user_name: "tester",
    });
    expect(res.statusCode).toBe(400);
  });
});
