const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

// all test cases clear expect 500
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
        res.status(404).send({ message: "User Not found" });
      }
    } else {
      res.status(400).send("Validation Error");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllStudents = async (req, res) => {
  //  Complete this Function
  try {
    const students = await User.find();
    if (students.length > 0) {
      res.status(200).send(students);
    } else {
      res.status(404).send("No Student found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStudentById = async (req, res) => {
  //  Complete this Function
  try {
    const student = await Student.findById(req.params.studentId);
    if (student) {
      res.status(200).send(student);
    } else {
      res.status(404).send("No student with given id");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateStudentDataByID = async (req, res) => {
  const userId = req.params.studentId;
  const updateData = req.body;
  try {
    // Validate request body against the Mongoose schema
    if (Object.keys(updateData).length < 1) {
      res.status(400).send("error body");
    } else {
      Student.findByIdAndUpdate(userId, updateData, { new: true }).then(
        (oldStudent) => {
          if (oldStudent) {
            res.status(204).send(oldStudent);
          } else {
            res.status(404).json("No student with given id");
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteStudentById = async (req, res) => {
  //  Complete this Function
  try {
    const deletedUser = await Student.findByIdAndDelete(req.params.studentId);
    if (deletedUser) {
      res.status(200).send({ message: "Deleted" });
    } else {
      res.status(404).send("No student with given id");
    }
  } catch (error) {
    res.status(500).json("Error Occured :(");
  }
};

module.exports = {
  postLoginUser,
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudentDataByID,
};
