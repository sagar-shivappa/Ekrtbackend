const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 8001;
const { intializeDB } = require("./utils/intializeDb");

require("dotenv").config();

/* Connecting to the database and then starting the server. */
mongoose
  .connect(process.env.MONGODB_URI + process.env.DB_NAME)
  .then(() => {
    intializeDB();
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
