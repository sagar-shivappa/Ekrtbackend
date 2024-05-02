const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const studentModel = require("../models/student.model");
require("dotenv").config();

let mongoServer;

/* Establish a MongoDB in-memory server before all tests. */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
});

/* Close the MongoDB in-memory server and database after all tests. */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

/* Testing the API endpoints. */
describe("POST /student", () => {
  const payload = {
    firstName: "Jake",
    lastName: "Johnson",
    email: "jj@school.com",
  };

  it("should return 201 with id of student on success", async () => {

    const res = await request(app).post("/student").send(payload);
    expect(res.statusCode).toBe(201);
  });

  it("should return 400 with validation error message", async () => {

    const res = await request(app).post("/student").send({
      firstName: "Jake",
      lastName: "Johnson"
    });
    expect(res.statusCode).toBe(400);
    expect(res.text).not.toBe("");
  });
});