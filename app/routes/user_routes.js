module.exports = (app) => {
  const user = require("../controllers/user");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  router.post("/", auth, user.create);
  router.post("/login", user.login);
  router.post("/logins", user.logins);
  router.get("/filter", auth, user.findFilter);
  router.get("/", auth, user.findAll);
  router.get("/:id", auth, user.findOne);
  router.put("/:id", auth, user.update);
  router.delete("/:id", auth, user.delete);

  app.use("/api/user", router);
};
