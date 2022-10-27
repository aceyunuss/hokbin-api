const db = require("../models");
const Cart = db.Cart_item;
const response = require("../utils/response");
const general = require("../utils/general");
const promo = require("../controllers/promo");
const order = require("../controllers/order");

exports.create = async (req, res) => {
  if (
    !req.body.menu_id ||
    !req.body.menu_name ||
    !req.body.price ||
    !req.body.qty ||
    !req.body.total ||
    !req.body.customer_id
  ) {
    response.badRequest("Missing required field", res);
    return;
  }
  const cart = {
    menu_id: req.body.menu_id,
    menu_name: req.body.menu_name,
    price: req.body.price,
    qty: req.body.qty,
    total: req.body.total,
    customer_id: req.body.customer_id,
  };
  const ins = await Cart.insertData(cart);
  if (typeof ins.msg != "object") {
    response.success("Success add cart", res, ins.data);
  } else {
    response.internalServerError("Error add cart", res);
  }
};

exports.findAll = async (req, res) => {
  const fnd = await Cart.getData();
  if (typeof fnd.msg != "object") {
    response.success("Success get cart", res, fnd.data);
  } else {
    response.internalServerError("Error get cart", res);
  }
};

exports.findOne = async (req, res) => {
  const cond = { customer_id: req.params.id };
  const fnd = await Cart.getData(cond);
  if (typeof fnd.msg != "object") {
    if (fnd.count > 0) {
      response.success("Success get cart", res, fnd.data);
    } else {
      response.notFound("Cart not found", res);
    }
  } else {
    response.internalServerError("Error get cart", res);
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

  const fnd = await Cart.findAndCountAll({ limit, offset });
  const fnd_res = general.getPagingData(fnd, off, lim);

  if (typeof fnd.msg != "object") {
    response.success("Success get cart", res, fnd_res);
  } else {
    response.internalServerError("Error get cart", res);
  }
};

exports.update = async (req, res) => {
  if (!req.body.qty || !req.body.total) {
    response.badRequest("Missing required field", res);
    return;
  }
  const id = req.params.id;
  const data = {
    qty: req.body.qty,
    total: req.body.total,
  };

  const upd = await Cart.updateData(id, data);
  if (typeof upd.msg != "object") {
    response.success("Success update cart", res, upd.data);
  } else {
    response.internalServerError("Error update cart", res);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const del = await Cart.deleteData(id);

  if (typeof del.msg != "object") {
    if (del.data == 1) {
      response.success("Success delete cart", res, del.data);
    } else {
      response.notFound("Error delete cart. Data not found", res);
    }
  } else {
    response.internalServerError("Error delete cart", res);
  }
};

exports.checkout = async (req, res) => {
  const cond = { customer_id: req.params.id };
  const discount_id = req.body.discount_id;
  let item = [];
  let total_item = 0;
  const fnd = await Cart.getData(cond);

  if (fnd.count == 0) {
    response.notFound("Cart item not fount", res);
  } else {
    fnd.data.map((v) => {
      total_item += v.total;
    });
    const disc = await promo.checkPromo(discount_id, total_item);

    const ord = {
      order_date: new Date(),
      customer_id: fnd.data[0].customer_id,
      discount_id: discount_id,
      total: total_item,
      total_discount: total_item - disc,
      status: 1,
    };

    fnd.data.map((v, i) => {
      itm = v.toJSON();
      item[i] = {
        menu_id: itm.menu_id,
        menu_name: itm.menu_name,
        price: itm.price,
        qty: itm.qty,
        total: itm.total,
      };
    });

    stat = await order.createOrder({ main: ord, item: item });

    if (typeof stat == "object") {
      await Cart.destroy({
        where: { customer_id: fnd.data[0].customer_id },
      });
      response.success("Success checkout item", res, {});
    } else {
      response.internalServerError("Error checkout item", res);
    }
  }
};
