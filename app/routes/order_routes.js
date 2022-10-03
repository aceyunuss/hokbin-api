module.exports = (app) => {
  const order = require("../controllers/order.js");

  var router = require("express").Router();

  router.get("/", order.findAll);
  router.get("/:id", order.findOne);
  router.put("/set_driver/:id", order.setDriver);
  router.put("/complete/:id", order.complete);
  router.delete("/:id", order.delete);

  app.use("/api/order", router);
};
