const db = require("../models");
const menu_category = require("../models/menu_category");
const Menu_category = db.Menu_category;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const menu_category = {
    category_name: req.body.name,
  };

  Menu_category.create(menu_category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error create menu category",
      });
    });
};

exports.findAll = (req, res) => {
  Menu_category.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Menu_categorys.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Menu_category.findByPk(id).then((data) => {
    console.log(req);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        status: 404,
        message: `Can't find menu category with id ${id}`,
      });
    }
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Menu_category.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Menu category was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Menu category with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Menu category with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Menu_category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Menu category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Menu category with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Menu_category with id=${id}`,
      });
    });
};
