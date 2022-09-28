module.exports = (app) => {
  const cart_item = require("../controllers/cart_item.js");

  var router = require("express").Router();
  router.post("/", cart_item.create);
  router.get("/", cart_item.findAll);
  router.get("/:id", cart_item.findOne);
  router.put("/:id", cart_item.update);
  router.delete("/:id", cart_item.delete);

  app.use("/api/cart_item", router);
};
