const db = require("../models");
const User = db.User;
const response = require("../utils/response");
const general = require("../utils/general");

const insertData = async (data_ins) => {
  try {
    const stat_ins = await User.create(data_ins);
    const stat_res = stat_ins.toJSON();
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const getData = async (cond = {}) => {
  try {
    const stat_find = await User.findAll({ where: cond });
    return {
      msg: "success",
      count: stat_find.length,
      data: stat_find,
    };
  } catch (error) {
    return { msg: error };
  }
};

const updateData = async (id, data = {}) => {
  try {
    await User.update(data, {
      where: { id: id },
    });
    const data_ret = await getData({ id: id });
    const stat_res = data_ret.data;
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const deleteData = async (id) => {
  try {
    const stat_res = await User.destroy({
      where: { id: id },
    });
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

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

  const ins = await insertData(user);
  if (typeof ins.msg != "object") {
    response.success("Success create user", res, ins.data);
  } else {
    response.internalServerError("Error create user", res);
  }
};

exports.findAll = async (req, res) => {
  const fnd = await getData();
  if (typeof fnd.msg != "object") {
    response.success("Success get user", res, fnd.data);
  } else {
    response.internalServerError("Error get user", res);
  }
};

exports.findOne = async (req, res) => {
  const cond = { id: req.params.id };
  const fnd = await getData(cond);
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
  const off = req.query.offset;
  const { limit, offset } = general.getPagination(lim, off);

  const fnd = await User.findAndCountAll({ limit, offset });
  const fnd_res = general.getPagingData(fnd, off, lim);

  if (typeof fnd.msg != "object") {
    response.success("Success get user", res, fnd_res);
  } else {
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

  const upd = await updateData(id, data);
  if (typeof upd.msg != "object") {
    response.success("Success update user", res, upd.data);
  } else {
    response.internalServerError("Error update user", res);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const del = await deleteData(id);

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
    password: req.body.password,
  };

  const fnd = await getData(cond);
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
