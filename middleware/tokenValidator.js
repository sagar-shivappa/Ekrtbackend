const jwt = require("jsonwebtoken");

async function tokenValidation(req, res, next) {
  if (req.path == "/login") {
    next();
  } else {
    if (req?.headers && req?.headers?.authorization) {
      const [tokenType, Token] = req.headers.authorization.split(" ");

      if (tokenType === "Bearer") {
        try {
          jwt.verify(Token, process.env.JWT_SECRET || "secretkey");

          next();
        } catch (error) {
          res.status(400).json({ message: "Invalid token" });
        }
      } else {
        res.status(400).json({ message: "Invalid Token Type" });
      }
    } else {
      res.status(400).send({ message: "No token found" });
    }
  }
}

module.exports = { tokenValidation };
