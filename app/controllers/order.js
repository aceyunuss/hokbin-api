const db = require("../models");
const Order = db.Order;
const Order_item = db.Order_item;
const response = require("../utils/response");
const general = require("../utils/general");

const insertData = async (data_ins) => {
  try {
    const stat_ins = await Order.create(data_ins);
    const stat_res = stat_ins.toJSON();
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const insertDataItem = async (data_ins) => {
  try {
    const stat_ins = await Order_item.bulkCreate(data_ins);
    const stat_res = await getDataItem({
      order_id: stat_ins[0].toJSON().order_id,
    });
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const getData = async (cond = {}) => {
  try {
    const stat_find = await Order.findAll({ where: cond, raw: true });
    return {
      msg: "success",
      count: stat_find.length,
      data: stat_find,
    };
  } catch (error) {
    return { msg: error };
  }
};

const getDataItem = async (cond = {}) => {
  try {
    const stat_find = await Order_item.findAll({ where: cond, raw: true });
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
    await Order.update(data, {
      where: { id: id },
    });
    const data_ret = await getData({ id: id });
    const stat_res = data_ret.data;
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const updateDataItem = async (id, data = {}) => {
  try {
    await Order_item.update(data, {
      where: { id: id },
    });
    const data_ret = await getDataItem({ id: id });
    const stat_res = data_ret.data;
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const deleteData = async (id) => {
  try {
    const stat_res = await Order.destroy({
      where: { id: id },
    });
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

const deleteDataItem = async (id) => {
  try {
    const stat_res = await Order_item.destroy({
      where: { id: id },
    });
    return { msg: "success", data: stat_res };
  } catch (error) {
    return { msg: error };
  }
};

exports.findAll = async (req, res) => {
  const fnd = await getData();
  const fnd_itm = await getDataItem();
  if (typeof fnd.msg != "object") {
    data_ret = [];
    fnd.data.forEach((v, i) => {
      data_ret[i] = v;
      itm = [];
      fnd_itm.data.forEach((vv, ii) => {
        if (vv.order_id == v.id) {
          itm[ii] = vv;
        }
      });
      if (itm.length > 0) {
        data_ret[i].item = itm;
      }
    });
    response.success("Success get order", res, data_ret);
  } else {
    response.internalServerError("Error get order", res);
  }
};

exports.findOne = async (req, res) => {
  const cond = { id: req.params.id };
  const fnd = await getData(cond);
  const fnd_itm = await getDataItem({ order_id: req.params.id });
  let data_ret = fnd.data;
  data_ret[0].item = fnd_itm.data;
  if (typeof fnd.msg != "object") {
    if (fnd.count > 0) {
      response.success("Success get order", res, data_ret);
    } else {
      response.notFound("Order not found", res);
    }
  } else {
    response.internalServerError("Error get order", res);
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

  const fnd = await Order.findAndCountAll({ limit, offset });
  const fnd_res = general.getPagingData(fnd, off, lim);

  if (typeof fnd.msg != "object") {
    response.success("Success get order", res, fnd_res);
  } else {
    response.internalServerError("Error get order", res);
  }
};

exports.setDriver = async (req, res) => {
  if (!req.body.driver_id) {
    response.badRequest("Missing required field", res);
    return;
  }
  const id = req.params.id;
  const data = {
    status: 2,
    driver_id: req.body.driver_id,
  };
  const upd = await updateData(id, data);
  if (typeof upd.msg != "object") {
    response.success("Success set driver", res, upd.data);
  } else {
    response.internalServerError("Error set driver", res);
  }
};

exports.complete = async (req, res) => {
  const id = req.params.id;
  const data = {
    status: 3,
    completed_date: new Date(),
  };

  const upd = await updateData(id, data);
  if (typeof upd.msg != "object") {
    response.success("Success completed order", res, upd.data);
  } else {
    response.internalServerError("Error completed order", res);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const del = await deleteData(id);

  if (typeof del.msg != "object") {
    if (del.data == 1) {
      response.success("Success delete order", res, del.data);
    } else {
      response.notFound("Error delete order. Data not found", res);
    }
  } else {
    response.internalServerError("Error delete order", res);
  }
};

exports.createOrder = async (data) => {
  const last = await Order.count();
  const ord_code = last + 1;

  data.main.order_code = "ORD.00" + ord_code;
  ord = await insertData(data.main);

  data.item.map((v, i) => (data.item[i].order_id = ord.data.id));
  itm = await insertDataItem(data.item);

  if (typeof ord.msg != "object" && typeof itm.msg != "object") {
    return { main_ret: ord, item_ret: itm };
  } else {
    return "failed";
  }
};
