const e = require("express");
var express = require("express");
var router = express.Router();
const {
  validateNewUser,
  validateUpdateUser,
} = require("../utils/validateData");
const passport = require("passport");
const passportService = require("../authentication/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const User = require("../models/UserModel");
const Family = require("../models/FamilyModel");

router.post("/", function (req, res, next) {
  const { name, parent, children, famFacts } = req.body;
  const newFamily = new Family({ name, parent, children, famFacts }).save(
    (err) => {
      if (err) return next(err);
      res.status(204).json(newFamily);
      res.end();
    }
  );
});

module.exports = router;
