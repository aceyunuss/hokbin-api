const db = require("../models");
const promo = require("../models/promo");
const Promo = db.Promo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const promo = {
    promo_name: req.body.name,
    discount: req.body.discount,
    min_order: req.body.min_order,
    max_discount: req.body.max_discount,
    end_date: req.body.end_date,
  };

  Promo.create(promo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error create promo",
      });
    });
};

exports.findAll = (req, res) => {
  Promo.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Promos.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Promo.findByPk(id).then((data) => {
    console.log(req);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        status: 404,
        message: `Can't find promo with id ${id}`,
      });
    }
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Promo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Promo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update promo with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating promo with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Promo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Promo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete promo with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete promo with id=${id}`,
      });
    });
};

exports.findFilter = (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Promo.findAndCountAll({ limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};
