module.exports = (app) => {
  const cart = require("../controllers/cart.js");

  var router = require("express").Router();
  router.post("/", cart.add);
  router.get("/", cart.findAll);
  router.get("/:id", cart.findOne);
  router.put("/item/:id", cart.updateItem);
  // router.delete("/item/:id", cart.deleteItem);

  app.use("/api/cart", router);
};
