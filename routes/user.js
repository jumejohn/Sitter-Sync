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

router.put("/:userId", requireAuth, async function (req, res, next) {
  const userId = req.params.userId;
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
  User.findOneAndUpdate(
    { _id: userId },
    {
      username,
      firstname,
      lastname,
      email,
      avatarUrl,
      children,
      family,
      password,
    },
    async (err, user) => {
      if (err) {
        res.status(400).send(err);
        return next(err);
      } else {
        res.status(204).json(user);
        res.end();
      }
    }
  );
});

/* DELETE remove user by id */
router.delete("/:userId", requireAuth, function (req, res, next) {
  const id = req.params.userId;
  User.findByIdAndDelete(id).exec((err, user) => {
    if (err) {
      res.status(400).send(err);
      return next(err);
    } else {
      return res.status(200).json(user);
    }
  });
});

router.put("/:userId/invitedevents", function (req, res, next) {
  const id = req.params;
  const { email } = req.body;
  console.log("req.body", req.body);
  Event.find({ invitedUsers: email })
    .populate("children")
    .exec((err, event) => {
      console.log(event);
      if (err) {
        res.status(400).send(err);
        return next(err);
      } else {
        console.log(event);
        res.status(200).json(event);
      }
    });
});
router.put("/:userId/confirmevent", async function (req, res, next) {
  const { userId } = req.params;
  console.log(userId);
  const { event, email } = req.body;
  console.log(event, "event");
  const eventUpdate = {
    $pull: { invitedUser: { $in: email } },
    $push: { confirmedUsers: userId },
  };
  Event.updateOne({ _id: event }, eventUpdate).exec();
  User.findOneAndUpdate(
    { _id: userId },
    {
      $push: { events: event },
    }
  ).exec((err, event) => {
    if (err) {
      res.status(400).send(err);
      return next(err);
    } else {
      console.log(event, "result");
      res.status(204).json(event);
      res.end();
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

router.delete("/child/:childId", requireAuth, async function (req, res, next) {
  const childId = req.params.childId;
  Child.findByIdAndDelete(childId).exec((err, child) => {
    if (err) {
      res.status(400).send(err);
      return next(err);
    } else {
      return res.status(200).json(child);
    }
  });
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

  const newDescription = description.map((task) => {
    return { value: task.value, done: false };
  });

  new Event({
    title,
    description: newDescription,
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
router.put("/edittask/:taskId", async function (req, res, next) {
  const taskId = req.params.taskId;
  const { eventId } = req.body;
  console.log(req.body);
  Event.findById(eventId)
    .then((event) => {
      const task = event.description.id(taskId);
      if (task.done === true) {
        task.set("done", false);
      } else {
        task.set("done", true);
      }
      return event.save();
    })
    .then(async (doc, err) => {
      if (doc) {
        console.log(doc);
        res.status(204).json(doc);
        res.end();
      } else {
        console.log(err);
        res.status(400).send(err);
        return next(err);
      }
    });
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
