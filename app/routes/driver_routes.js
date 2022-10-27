module.exports = (app) => {
  const driver = require("../controllers/driver.js");
  const auth = require("../middleware/auth");

  var router = require("express").Router();
  router.post("/", auth, driver.create);
  router.post("/login", driver.login);
  router.get("/filter", auth, driver.findFilter);
  router.get("/", auth, driver.findAll);
  router.get("/:id", auth, driver.findOne);
  router.put("/:id", auth, driver.update);
  router.delete("/:id", auth, driver.delete);

  app.use("/api/driver", router);
};
