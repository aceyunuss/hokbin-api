const db = require("../models");
const cart = require("../models/cart");
const cart_item = require("../models/cart_item");
const helper = require("../helper/general");
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
        header = data.toJSON();
        header.item = data_item;
        res.send(header);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error create cart",
      });
    });
};

exports.findAll = (req, res) => {
  Cart.findAll()
    .then((data) => {
      Cart_item.findAll().then((data_item) => {
        ret_data = [];

        data.map((v) => {
          new_data = v.toJSON();
          ret_data.push(new_data);

          new_item = [];
          data_item.map((i) => {
            itm = i.toJSON();
            if (itm.cart_id == new_data.id) {
              new_item.push(itm);
              new_data.item = new_item;
            }
          });
        });

        res.send(ret_data);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Carts.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cart.findByPk(id)
    .then((data) => {
      if (data) {
        Cart_item.findAll({ where: { cart_id: id } }).then((data_item) => {
          header = data.toJSON();
          header.item = data_item;
          res.send(header);
        });
      } else {
        res.status(404).send({
          status: 404,
          message: `Can't find cart with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Carts.",
      });
    });
};

exports.updateItem = (req, res) => {
  const id = req.params.id;

  Cart_item.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cart item was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update cart item with id=${id}`,
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
