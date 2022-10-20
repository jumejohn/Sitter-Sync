const router = require("express").Router();

router.post("/register", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

module.exports = router;
