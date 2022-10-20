const db = require("../models");
const Menu_category = db.Menu_category;
const response = require("../utils/response");
const general = require("../utils/general");

const insertData = async (data_ins) => {
  try {
    const stat_ins = await Menu_category.create(data_ins);
    const stat_res = stat_ins.toJSON();
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const getData = async (cond = {}) => {
  try {
    const stat_find = await Menu_category.findAll({ where: cond });
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
    await Menu_category.update(data, {
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
    const stat_res = await Menu_category.destroy({
      where: { id: id },
    });
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

exports.create = async (req, res) => {
  if (!req.body.name) {
    response.badRequest("Missing required field", res);
    return;
  }
  const menu_category = {
    category_name: req.body.name,
  };
  const ins = await insertData(menu_category);
  if (typeof ins.msg != "object") {
    response.success("Success create menu category", res, ins.data);
  } else {
    response.internalServerError("Error create menu category", res);
  }
};

exports.findAll = async (req, res) => {
  const fnd = await getData();
  if (typeof fnd.msg != "object") {
    response.success("Success get menu category", res, fnd.data);
  } else {
    response.internalServerError("Error get menu category", res);
  }
};

exports.findOne = async (req, res) => {
  const cond = { id: req.params.id };
  const fnd = await getData(cond);
  if (typeof fnd.msg != "object") {
    if (fnd.count > 0) {
      response.success("Success get menu category", res, fnd.data);
    } else {
      response.notFound("Menu category not found", res);
    }
  } else {
    response.internalServerError("Error get menu category", res);
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

  const fnd = await Menu_category.findAndCountAll({ limit, offset });
  const fnd_res = general.getPagingData(fnd, off, lim);

  if (typeof fnd.msg != "object") {
    response.success("Success get menu category", res, fnd_res);
  } else {
    response.internalServerError("Error get menu category", res);
  }
};

exports.update = async (req, res) => {
  if (!req.params.id) {
    response.badRequest("Missing required field", res);
    return;
  }
  const id = req.params.id;
  const data = { category_name: req.body.category_name };

  const upd = await updateData(id, data);
  if (typeof upd.msg != "object") {
    response.success("Success update menu category", res, upd.data);
  } else {
    response.internalServerError("Error update menu category", res);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const del = await deleteData(id);

  if (typeof del.msg != "object") {
    if (del.data == 1) {
      response.success("Success delete menu category", res, del.data);
    } else {
      response.notFound("Error delete menu category. Data not found", res);
    }
  } else {
    response.internalServerError("Error delete menu category", res);
  }
};
