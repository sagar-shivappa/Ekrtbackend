const express = require("express");
const routes = require("./routes/ekart.route");
const cors = require("cors");
const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());
app.use(cors());

/* This is the root route. It is used to check if the server is running. */
app.get("/", (req, res) => {
  res.status(200).json({ alive: "True" });
});

app.use("/", routes);
module.exports = app;
