const db = require("../models");
const Menu = db.Menu;
const response = require("../utils/response");
const general = require("../utils/general");

const insertData = async (data_ins) => {
  try {
    const stat_ins = await Menu.create(data_ins);
    const stat_res = stat_ins.toJSON();
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const getData = async (cond = {}) => {
  try {
    const stat_find = await Menu.findAll({ where: cond });
    return {
      msg: "success",
      count: stat_find.length,
      data: stat_find.length == 1 ? stat_find[0] : stat_find,
    };
  } catch (error) {
    return { msg: error };
  }
};

const updateData = async (id, data = {}) => {
  try {
    await Menu.update(data, {
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
    const stat_res = await Menu.destroy({
      where: { id: id },
    });
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

exports.create = async (req, res) => {
  if (!req.body.name || !req.body.category_id || !req.body.price) {
    response.badRequest("Missing required field", res);
    return;
  }
  const menu = {
    menu_name: req.body.name,
    category_id: req.body.category_id,
    price: req.body.price,
  };
  const ins = await insertData(menu);
  if (typeof ins.msg != "object") {
    response.success("Success create menu", res, ins.data);
  } else {
    response.internalServerError("Error create menu", res);
  }
};

exports.findAll = async (req, res) => {
  const fnd = await getData();
  if (typeof fnd.msg != "object") {
    response.success("Success get menu", res, fnd.data);
  } else {
    response.internalServerError("Error get menu", res);
  }
};

exports.findOne = async (req, res) => {
  const cond = { id: req.params.id };
  const fnd = await getData(cond);
  if (typeof fnd.msg != "object") {
    if (fnd.count > 0) {
      response.success("Success get menu", res, fnd.data);
    } else {
      response.notFound("Menu not found", res);
    }
  } else {
    response.internalServerError("Error get menu", res);
  }
};

exports.findByCategory = async (req, res) => {
  if (!req.params.id) {
    response.badRequest("Missing required field", res);
    return;
  }
  const cond = { category_id: req.params.id };
  const fnd = await getData(cond);
  if (typeof fnd.msg != "object") {
    response.success("Success get menu", res, fnd.data);
  } else {
    response.internalServerError("Error get menu", res);
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

  const fnd = await Menu.findAndCountAll({ limit, offset });
  const fnd_res = general.getPagingData(fnd, off, lim);

  if (typeof fnd.msg != "object") {
    response.success("Success get menu", res, fnd_res);
  } else {
    response.internalServerError("Error get menu", res);
  }
};

exports.update = async (req, res) => {
  if (!req.params.id) {
    response.badRequest("Missing required field", res);
    return;
  }
  const id = req.params.id;
  const data = {
    menu_name: req.body.menu_name,
    category_id: req.body.category_id,
    price: req.body.price,
  };

  const upd = await updateData(id, data);
  if (typeof upd.msg != "object") {
    response.success("Success update menu", res, upd.data);
  } else {
    response.internalServerError("Error update menu", res);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const del = await deleteData(id);

  if (typeof del.msg != "object") {
    if (del.data == 1) {
      response.success("Success delete menu", res, del.data);
    } else {
      response.notFound("Error delete menu. Data not found", res);
    }
  } else {
    response.internalServerError("Error delete menu", res);
  }
};
