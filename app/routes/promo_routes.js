module.exports = (app) => {
  const promo = require("../controllers/promo.js");
  const auth = require("../middleware/auth");

  var router = require("express").Router();
  router.post("/", auth, promo.create);
  router.get("/", auth, promo.findAll);
  router.get("/filter", auth, promo.findFilter);
  router.get("/:id", auth, promo.findOne);
  router.put("/:id", auth, promo.update);
  router.delete("/:id", auth, promo.delete);

  app.use("/api/promo", router);
};
