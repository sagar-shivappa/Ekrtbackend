const express = require("express");

const {
  getAllStudents,
  getStudentById,
  postLoginUser,
  deleteStudentById,
  updateStudentDataByID,
} = require("../controllers/ekart.controller");

const router = express.Router();

//Add route to Post a new student data
router.post("/login", postLoginUser);

//Add route to Get all students
router.get("/students", getAllStudents);

//Add route to Get a students by id
router.get("/student/:studentId", getStudentById);

//Add route to Update a students by id
router.put("/student/:studentId", updateStudentDataByID);

//Add route to Delete a students by id
router.delete("/student/:studentId", deleteStudentById);

module.exports = router;
