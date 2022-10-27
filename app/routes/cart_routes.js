module.exports = (app) => {
  const cart = require("../controllers/cart.js");
  const auth = require("../middleware/auth");

  var router = require("express").Router();
  router.post("/", auth, cart.create);
  router.get("/filter", auth, cart.findFilter);
  router.get("/", auth, cart.findAll);
  router.get("/:id", auth, cart.findOne);
  router.put("/:id", auth, cart.update);
  router.put("/checkout/:id", auth, cart.checkout);
  router.delete("/:id", auth, cart.delete);

  app.use("/api/cart", router);
};
