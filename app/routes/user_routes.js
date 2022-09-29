module.exports = (app) => {
  const user = require("../controllers/user.js");

  var router = require("express").Router();
  router.post("/", user.create);
  router.post("/login", user.login);
  router.get("/", user.findAll);
  router.get("/:id", user.findOne);
  router.put("/:id", user.update);
  router.delete("/:id", user.delete);

  app.use("/api/user", router);
};
