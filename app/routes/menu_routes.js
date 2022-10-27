module.exports = (app) => {
  const menu = require("../controllers/menu.js");
  const auth = require("../middleware/auth");

  var router = require("express").Router();
  router.post("/", auth, menu.create);
  router.get("/", auth, menu.findAll);
  router.get("/filter", auth, menu.findFilter);
  router.get("/category/:id", auth, menu.findByCategory);
  router.get("/:id", auth, menu.findOne);
  router.put("/:id", auth, menu.update);
  router.delete("/:id", auth, menu.delete);

  app.use("/api/menu", router);
};
