var express = require("express");
var router = express.Router();
const passport = require("passport");
const passportService = require("../authentication/passport");

const Auth = require("../controllers/auth");

const requireAuth = passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/auth/unauth",
});

const requireSignin = passport.authenticate("local", { session: false });

router.get("/auth/unauth", function (req, res, next) {
  res.status(401).send("Unauthorized");
});

router.post("/auth/signin", requireSignin, Auth.signin);

module.exports = router;
