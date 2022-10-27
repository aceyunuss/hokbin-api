module.exports = (app) => {
  const order = require("../controllers/order.js");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.get("/filter", auth, order.findFilter);
  router.get("/", auth, order.findAll);
  router.get("/:id", auth, order.findOne);
  router.put("/driver/:id", auth, order.setDriver);
  router.put("/delivery/:id", auth, order.setDelivery);
  router.put("/complete/:id", auth, order.complete);
  router.delete("/:id", auth, order.delete);

  app.use("/api/order", router);
};
