const db = require("../models");
const Promo = db.Promo;
const response = require("../utils/response");
const general = require("../utils/general");

const insertData = async (data_ins) => {
  try {
    const stat_ins = await Promo.create(data_ins);
    const stat_res = stat_ins.toJSON();
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const getData = async (cond = {}) => {
  try {
    const stat_find = await Promo.findAll({ where: cond });
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
    await Promo.update(data, {
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
    const stat_res = await Promo.destroy({
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
    !req.body.discount ||
    !req.body.min_order ||
    !req.body.max_discount ||
    !req.body.end_date
  ) {
    response.badRequest("Missing required field", res);
    return;
  }
  const promo = {
    promo_name: req.body.name,
    discount: req.body.discount,
    min_order: req.body.min_order,
    max_discount: req.body.max_discount,
    end_date: req.body.end_date,
  };
  const ins = await insertData(promo);
  if (typeof ins.msg != "object") {
    response.success("Success create promo", res, ins.data);
  } else {
    response.internalServerError("Error create promo", res);
  }
};

exports.findAll = async (req, res) => {
  const fnd = await getData();
  if (typeof fnd.msg != "object") {
    response.success("Success get promo", res, fnd.data);
  } else {
    response.internalServerError("Error get promo", res);
  }
};

exports.findOne = async (req, res) => {
  const cond = { id: req.params.id };
  const fnd = await getData(cond);
  if (typeof fnd.msg != "object") {
    if (fnd.count > 0) {
      response.success("Success get promo", res, fnd.data);
    } else {
      response.notFound("Promo not found", res);
    }
  } else {
    response.internalServerError("Error get promo", res);
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

  const fnd = await Promo.findAndCountAll({ limit, offset });
  const fnd_res = general.getPagingData(fnd, off, lim);

  if (typeof fnd.msg != "object") {
    response.success("Success get promo", res, fnd_res);
  } else {
    response.internalServerError("Error get promo", res);
  }
};

exports.update = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.discount ||
    !req.body.min_order ||
    !req.body.max_discount ||
    !req.body.end_date
  ) {
    response.badRequest("Missing required field", res);
    return;
  }
  const id = req.params.id;
  const data = {
    promo_name: req.body.name,
    discount: req.body.discount,
    min_order: req.body.min_order,
    max_discount: req.body.max_discount,
    end_date: req.body.end_date,
  };

  const upd = await updateData(id, data);
  if (typeof upd.msg != "object") {
    response.success("Success update promo", res, upd.data);
  } else {
    response.internalServerError("Error update promo", res);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const del = await deleteData(id);

  if (typeof del.msg != "object") {
    if (del.data == 1) {
      response.success("Success delete promo", res, del.data);
    } else {
      response.notFound("Error delete promo. Data not found", res);
    }
  } else {
    response.internalServerError("Error delete promo", res);
  }
};
