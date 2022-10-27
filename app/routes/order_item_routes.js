module.exports = (app) => {
  const order_item = require("../controllers/order_item.js");
  const auth = require("../middleware/auth");

  var router = require("express").Router();
  router.post("/", auth, order_item.create);
  router.get("/", auth, order_item.findAll);
  router.get("/:id", auth, order_item.findOne);
  router.put("/:id", auth, order_item.update);
  router.delete("/:id", auth, order_item.delete);

  app.use("/api/order_item", router);
};
