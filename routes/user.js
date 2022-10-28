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
const Event = require("../models/EventModel");
const Child = require("../models/ChildModel");
const { populate } = require("../models/UserModel");

/* GET user by id */
router.get("/:userId", requireAuth, function (req, res, next) {
  const id = req.params.userId;
  User.findById(id)
    .populate({
      path: "events",
      populate: { path: "children", model: "Child" },
    })
    .populate("children")
    .exec((err, user) => {
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
router.post("/:userId/addchild", requireAuth, async function (req, res, next) {
  const userId = req.params.userId;
  const filter = { _id: userId };
  const { name, age, childFacts } = req.body;

  const newChild = new Child({
    name,
    age,
    childFacts,
  }).save(async (err, child) => {
    if (err) {
      res.status(400).send(err);
      return next(err);
    } else {
      console.log(child);
      const updatedUser = await User.updateOne(filter, {
        $push: { children: child._id },
      }).populate("children", async (err, child) => {
        if (err) {
          res.status(400).send(err);
          return next(err);
        } else {
          res.status(204).json(updatedUser);
          res.end();
        }
      });
    }
  });
});

router.post("/:userId/event", requireAuth, async function (req, res, next) {
  const userId = req.params.userId;
  const filter = { _id: userId };
  console.log("body", req.body);
  const {
    description,
    startDate,
    endDate,
    children,
    confirmedUsers,
    invitedUsers,
  } = req.body;

  new Event({
    description,
    startDate,
    endDate,
    children,
    owner: userId,
    confirmedUsers,
    invitedUsers,
  }).save(async (err, event) => {
    if (err) {
      res.status(400).send(err);
      return next(err);
    } else {
      console.log("Thisevent", event);
      const updatedUser = await User.updateOne(filter, {
        $push: { events: event._id },
      }).exec((err, event) => {
        if (err) {
          res.status(400).send(err);
          return next(err);
        } else {
          console.log("markedEvent", event);
          console.log("user", updatedUser);
          res.status(204).json(event);
          res.end();
        }
      });
    }
  });
});

router.get("/event/:eventId", requireAuth, async function (req, res, next) {
  const eventId = req.params.eventId;
  console.log("eventID", eventId);
  Event.findById(eventId)
    .populate("children")
    .exec((err, event) => {
      if (err) {
        res.status(400).send(err);
        return next(err);
      } else {
        // Event.updateOne({ $populate: { path: "children" } });
        return res.status(200).json(event);
      }
    });
});

module.exports = router;
