module.exports = (app) => {
  const menu_category = require("../controllers/menu_category.js");
  const auth = require("../middleware/auth");

  var router = require("express").Router();
  router.post("/", auth, menu_category.create);
  router.get("/", auth, menu_category.findAll);
  router.get("/filter", auth, menu_category.findFilter);
  router.get("/:id", auth, menu_category.findOne);
  router.put("/:id", auth, menu_category.update);
  router.delete("/:id", auth, menu_category.delete);

  app.use("/api/menu_category", router);
};
