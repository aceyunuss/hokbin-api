module.exports = (app) => {
  const promo = require("../controllers/promo.js");

  var router = require("express").Router();
  router.post("/", promo.create);
  router.get("/", promo.findAll);
  router.get("/filter", promo.findFilter);
  router.get("/:id", promo.findOne);
  router.put("/:id", promo.update);
  router.delete("/:id", promo.delete);

  app.use("/api/promo", router);
};
