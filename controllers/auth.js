const jwt = require("jwt-simple");
const User = require("../models/UserModel");
const keys = require("../config/keys");

const tokenForUser = (user) => {
  // console.log(user);
  return jwt.encode(
    {
      sub: user.id,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    keys.TOKEN_SECRET
  );
};

exports.signin = function (req, res, next) {
  // user.body
  res.send({
    token: tokenForUser(req.user),
    userID: req.user._id,
  });
};

exports.currentUser = function (req, res) {
  const user = {
    username: req.user.username,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    children: req.user.children,
    events: req.user.events,
    token: tokenForUser(req.user),
  };

  res.send(user);
};
