module.exports = (app) => {
  const user = require("../controllers/user.js");
  const auth = require("../middleware/auth.js");
  var router = require("express").Router();

  router.post("/", auth, user.create);
  router.post("/login", auth, user.login);
  router.post("/logins", auth, user.logins);
  router.get("/filter", auth, user.findFilter);
  router.get("/", auth, user.findAll);
  router.get("/:id", auth, user.findOne);
  router.put("/:id", auth, user.update);
  router.delete("/:id", auth, user.delete);

  app.use("/api/user", router);
};
