const db = require("../models");
const User = db.User;
const response = require("../utils/response");
const config = require("../config");
const Jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    let data = {};
    data["data"] = await User.findOne({
      where: { email: req.body.email, password: req.body.password },
      attributes: ["id", "name"],
    });
    data["token"] = await Jwt.sign(config.payLoad, config.secretKey);
  } catch (err) {
    return response.internalServerError(res, "Internal server error", err);
  }
};
