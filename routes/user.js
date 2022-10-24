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

/* GET user by id */
router.get("/:userId", requireAuth, function (req, res, next) {
  const id = req.params.userId;
  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(400).send(err);
      return next(err);
    } else {
      res.status(200).send(user).end();
    }
  });
});

/* POST add new user */
router.post("/", function (req, res, next) {
  if (validateNewUser(req)) {
    const {
      username,
      firstname,
      lastname,
      email,
      avatarUrl,
      children,
      family,
      password,
    } = req.body;
    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      avatarUrl,
      children,
      family,
      password,
    }).save((err) => {
      if (err) return next(err);
      res.status(204).json(newUser);
      res.end();
    });
  } else {
    res
      .status(401)
      .send(
        "username, firstname, lastname, email and password are required fields and cannot be empty"
      );
  }
});

/* DELETE remove user by id */
router.delete("/:userId", requireAuth, function (req, res, next) {
  const id = req.params.userId;
  User.findByIdAndDelete(id).exec((err) => {
    if (err) {
      res.status(400).send(err);
      return next(err);
    } else {
      res
        .send("User has been successfully removed from the database")
        .status(204)
        .end();
    }
  });
});

// Edit user by id
router.put("/:userId/addchild", requireAuth, async function (req, res, next) {
  if (validateUpdateUser(req)) {
    const userId = req.params.userId;
    const child = req.body;
    console.log(child);
    const filter = { _id: userId };
    const updatedUser = await User.find(filter);
    console.log(updatedUser, "Here");
    console.log("this", updatedUser.children);
    User.updateOne({ children: child }, (err) => {
      if (err) return next(err);
      res.status(204).json(updatedUser);
      res.end();
    });
  } else {
    res.status(401).send("Failed to add child to user");
  }
});

module.exports = router;
