const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const config = process.env;

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    response.forbidden("A token is required for authentication", res);
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], config.TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    response.invalid("Invalid Token", res);
  }
};

module.exports = auth;
