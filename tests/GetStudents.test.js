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
describe("GET /students", () => {
  it("should return all students if they exists", async () => {
    const Student = mongoose.model("Student");
    const testStudent1 = new Student({
      firstName: "Jake",
      lastName: "Johnson",
      email: "jj@school.com"
    });
    await testStudent1.save();
    const testStudent2 = new Student({
      firstName: "Emma",
      lastName: "Watson",
      email: "ew@school.com"
    });
    await testStudent2.save();
    const res = await request(app).get("/students");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it("should return 404 if no student exists", async () => {
    await mongoose.connection.dropDatabase();
    const res = await request(app).get("/students");
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("No Student found");
  });
});

describe("GET /student/:id", () => {
  it("should return the student when it exists", async () => {
    const Student = mongoose.model("Student");
    const testStudent1 = new Student({
      firstName: "Jake",
      lastName: "Johnson",
      email: "jj@school.com",

    });
    await testStudent1.save();

    const res = await request(app).get(`/student/${testStudent1._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Jake");
  });

  it("should return 404 if the student do not exists", async () => {
    const Student = mongoose.model("Student");
    const testStudent1 = new Student({
      firstName: "Jake",
      lastName: "Johnson",
      email: "jj@school.com",

    });

    const res = await request(app).get(`/student/${testStudent1._id}`);
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("No student with given id");
  });
});
