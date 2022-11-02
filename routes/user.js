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

// Add a new Child
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

router.put("/editchild/:childId", requireAuth, async function (req, res, next) {
  const childId = req.params.childId;
  const { name, age, childFacts } = req.body;
  console.log(childId);
  console.log(res.body);
  Child.findOneAndUpdate(
    { _id: childId },
    { name, age, childFacts },
    async (err, child) => {
      if (err) {
        res.status(400).send(err);
        return next(err);
      } else {
        res.status(204).json(child);
        res.end();
      }
    }
  );
});

router.post("/:userId/event", requireAuth, async function (req, res, next) {
  const userId = req.params.userId;
  const filter = { _id: userId };
  console.log("body", req.body);
  const {
    title,
    description,
    startDate,
    endDate,
    children,
    confirmedUsers,
    invitedUsers,
  } = req.body;

  new Event({
    title,
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
      const updatedUser = await User.updateOne(filter, {
        $push: { events: event._id },
      }).exec((err, event) => {
        if (err) {
          res.status(400).send(err);
          return next(err);
        } else {
          res.status(204).json(event);
          res.end();
        }
      });
    }
  });
});

router.put("/editevent/:eventId", requireAuth, async function (req, res, next) {
  const eventId = req.params.eventId;
  const {
    title,
    description,
    startDate,
    endDate,
    children,
    confirmedUsers,
    invitedUsers,
  } = req.body;
  Event.findOneAndUpdate(
    { _id: eventId },
    {
      title,
      description,
      startDate,
      endDate,
      children,
      confirmedUsers,
      invitedUsers,
    },
    async (err, event) => {
      if (err) {
        res.status(400).send(err);
        return next(err);
      } else {
        res.status(204).json(event);
        res.end();
      }
    }
  );
});

router.delete("/event/:eventId", requireAuth, async function (req, res, next) {
  const eventId = req.params.eventId;
  Event.findByIdAndDelete(eventId).exec((err, event) => {
    if (err) {
      res.status(400).send(err);
      return next(err);
    } else {
      return res.status(200).json(event);
    }
  });
});

module.exports = router;
