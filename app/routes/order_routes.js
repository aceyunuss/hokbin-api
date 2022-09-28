module.exports = (app) => {
  const order = require("../controllers/order.js");

  var router = require("express").Router();
  router.post("/", order.create);
  router.get("/", order.findAll);
  router.get("/:id", order.findOne);
  router.put("/:id", order.update);
  router.delete("/:id", order.delete);

  app.use("/api/order", router);
};
