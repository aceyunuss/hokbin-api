const db = require("../models");
const User = db.User;
const response = require("../utils/response");
const general = require("../utils/general");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");

function generateAccessToken(user) {
  acc_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return acc_token;
}

let refreshTokens = [];

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

exports.create = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.type ||
    !req.body.address ||
    !req.body.bod
  ) {
    response.badRequest("Missing required field", res);
    return;
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
    address: req.body.address,
    bod: req.body.bod,
  };

  const ins = await User.insertData(user);
  if (typeof ins.msg != "object") {
    response.success("Success create user", res, ins.data);
  } else {
    response.internalServerError("Error create user", res);
  }
};

exports.findAll = async (req, res) => {
  const fnd = await User.getData();
  if (typeof fnd.msg != "object") {
    response.success("Success get user", res, fnd.data);
  } else {
    response.internalServerError("Error get user", res);
  }
};

exports.findOne = async (req, res) => {
  const cond = { id: req.params.id };
  const fnd = await User.getData(cond);
  if (typeof fnd.msg != "object") {
    if (fnd.count > 0) {
      response.success("Success get user", res, fnd.data);
    } else {
      response.notFound("User not found", res);
    }
  } else {
    response.internalServerError("Error get user", res);
  }
};

exports.findFilter = async (req, res) => {
  if (!req.query.limit || !req.query.offset) {
    response.badRequest("Missing required field", res);
    return;
  }
  const lim = req.query.limit;
  const off = req.query.offset - 1;
  const { limit, offset } = general.getPagination(lim, off);

  try {
    const fnd = await User.findAndCountAll({ limit, offset });
    const fnd_res = general.getPagingData(fnd, off, lim);
    if (typeof fnd.msg != "object") {
      response.success("Success get user", res, fnd_res);
    } else {
      response.internalServerError("Error get user", res);
    }
  } catch (error) {
    response.internalServerError("Error get user", res);
  }
};

exports.update = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.type ||
    !req.body.address ||
    !req.body.bod
  ) {
    response.badRequest("Missing required field", res);
    return;
  }

  const id = req.params.id;

  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
    address: req.body.address,
    bod: req.body.bod,
  };

  const upd = await User.updateData(id, data);
  if (typeof upd.msg != "object") {
    response.success("Success update user", res, upd.data);
  } else {
    response.internalServerError("Error update user", res);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const del = await User.deleteData(id);

  if (typeof del.msg != "object") {
    if (del.data == 1) {
      response.success("Success delete user", res, del.data);
    } else {
      response.notFound("Error delete user. Data not found", res);
    }
  } else {
    response.internalServerError("Error delete user", res);
  }
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    response.badRequest("Missing required field", res);
    return;
  }
  const cond = {
    email: req.body.email,
    // password: req.body.password,
  };

  const col = ["id", "name", "password"];

  const fnd = await User.getData(cond, col);

  if (typeof fnd.msg != "object") {
    if (fnd.count > 0) {
      if (await bcrypt.compare(req.body.password, fnd.data[0].password)) {
        fnd.data[0].type = "Bearer";
        fnd.data[0].token = jwt.sign(
          { user_id: fnd.data[0].id, email: req.body.email },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
        response.success("Success login", res, fnd.data);
      } else {
        response.failLogin("Email and passsword not match", res);
      }
    } else {
      response.failLogin("Email not found", res);
    }
  } else {
    response.internalServerError("Error get user", res);
  }
};

exports.logins = async (req, res) => {
  const em = req.body.email;
  const pw = req.body.password;
  const data = await db.sequelize.query(
    `select * from users WHERE email = '${em}' and password = '${pw}'`,
    { type: db.sequelize.QueryTypes.SELECT }
  );
  response.success("asdf", res, data);
};
