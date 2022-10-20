const User = require("../models/UserModel");
const router = require("express").Router();

router.post("/register", async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;
  const newUser = new User({ email, firstName, lastName, password });
  console.log(req.body);
  await newUser.save();
  console.log(newUser);
  res.send({ message: "Ok api is working 🚀" });
});

module.exports = router;
