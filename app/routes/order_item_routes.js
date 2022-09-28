module.exports = (app) => {
  const order_item = require("../controllers/order_item.js");

  var router = require("express").Router();
  router.post("/", order_item.create);
  router.get("/", order_item.findAll);
  router.get("/:id", order_item.findOne);
  router.put("/:id", order_item.update);
  router.delete("/:id", order_item.delete);

  app.use("/api/order_item", router);
};
