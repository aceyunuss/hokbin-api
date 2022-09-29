const db = require("../models");
const menu = require("../models/menu");
const helper = require("../helper/general");
const Menu = db.Menu;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const menu = {
    menu_name: req.body.name,
    category_id: req.body.category_id,
    price: req.body.price,
  };

  Menu.create(menu)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error create menu",
      });
    });
};

exports.findAll = (req, res) => {
  Menu.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Menus.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Menu.findByPk(id).then((data) => {
    console.log(req);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        status: 404,
        message: `Can't find menu with id ${id}`,
      });
    }
  });
};

exports.findByCategory = (req, res) => {
  const id = req.params.id;
  Menu.findAll({ where: { category_id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menu.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Menu.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Menu was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update menu with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating menu with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Menu.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Menu was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete menu with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Menu with id=${id}`,
      });
    });
};

exports.findFilter = (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = helper.getPagination(page, size);

  Menu.findAndCountAll({ limit, offset })
    .then((data) => {
      const response = helper.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
