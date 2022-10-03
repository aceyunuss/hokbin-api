module.exports = (app) => {
  const driver = require("../controllers/driver.js");

  var router = require("express").Router();
  router.post("/", driver.create);
  router.post("/login", driver.login);
  router.get("/filter", driver.findFilter);
  router.get("/", driver.findAll);
  router.get("/:id", driver.findOne);
  router.put("/:id", driver.update);
  router.delete("/:id", driver.delete);

  app.use("/api/driver", router);
};
