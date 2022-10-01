module.exports = (app) => {
  const menu_category = require("../controllers/menu_category.js");

  var router = require("express").Router();
  router.post("/", menu_category.create);
  router.get("/", menu_category.findAll);
  router.get("/filter", menu_category.findFilter);
  router.get("/:id", menu_category.findOne);
  router.put("/:id", menu_category.update);
  router.delete("/:id", menu_category.delete);

  app.use("/api/menu_category", router);
};
