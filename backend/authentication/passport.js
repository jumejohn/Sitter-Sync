const express = require("express");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
const User = require("../models/UserModel");
const keys = require("../config/keys");

const jwt = require("jwt-simple");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;

const localLogin = new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .populate({})
    .exec((err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        // console.log('UUUser: ', user);
        done(null, user);
      } else {
        done(null, false);
      }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
