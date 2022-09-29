const db = require("../models");
const user = require("../models/user");
const User = db.User;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
    address: req.body.address,
    bod: req.body.bod,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error create user",
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id).then((data) => {
    console.log(req);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        status: 404,
        message: `Can't find user with id ${id}`,
      });
    }
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating user with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete user with id=${id}`,
      });
    });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({ where: { email: email, password: password } }).then((data) => {
    console.log(req);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        status: 404,
        message: `Can't find user with id ${id}`,
      });
    }
  });
};
