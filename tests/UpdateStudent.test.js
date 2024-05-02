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

const payload = {
  firstName: "Jake",
  lastName: "Johnson",
  email: "jj@school.com",
};

/* Testing the API endpoints. */
describe("Put /student/:id", () => {
  it("should update student and return no content", async () => {

    const Student = mongoose.model("Student");
    const testStudent1 = new Student({
      firstName: "Jake",
      lastName: "Johnson",
      email: "jj@school.com",

    });
    await testStudent1.save();

    const res = await request(app).put(`/student/${testStudent1._id}`).send({ firstName : "Johnson"});
    expect(res.statusCode).toBe(204);
  });

  it("should return 404 if no student exists", async () => {
    
    const Student = mongoose.model("Student");
    const testStudent1 = new Student({
        firstName: "Jake",
        lastName: "Johnson",
        email: "jj@school.com",
  
      });
  
    const res = await request(app).put(`/student/${testStudent1._id}`).send({ firstName : "Johnson"});
    expect(res.statusCode).toBe(404);
  });

  it("should return 400 if no student exists", async () => {
    await mongoose.connection.dropDatabase();
    const res = await request(app).put("/student/testid");
    expect(res.statusCode).toBe(400);
  });  
});