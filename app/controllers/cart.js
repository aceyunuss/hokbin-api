const db = require("../models");
const cart = require("../models/cart");
const cart_item = require("../models/cart_item");
const Cart = db.Cart;
const Cart_item = db.Cart_item;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
  const cart = {
    customer_id: req.body.customer_id,
    total: req.body.total,
  };

  const cart_item = req.body.item;

  Cart.create(cart)
    .then((data) => {
      cart_item.map((e) => {
        e.cart_id = data.id;
      });
      Cart_item.bulkCreate(cart_item).then((data_item) => {
        data.item = data_item;
        // merged = Object.assign(data, data_item);
        res.send(data);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error create cart",
      });
    });
};

exports.findAll = (req, res) => {
  Cart.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Carts.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cart.findByPk(id).then((data) => {
    console.log(req);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        status: 404,
        message: `Can't find cart with id ${id}`,
      });
    }
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Cart.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cart was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update cart with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating cart with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cart was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete cart with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete cart with id=${id}`,
      });
    });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Cart.findAll({ where: { email: email, password: password } }).then((data) => {
    console.log(req);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        status: 404,
        message: `Can't find cart`,
      });
    }
  });
};
