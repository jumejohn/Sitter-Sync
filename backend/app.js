const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
require("dotenv").config();
const User = require("./models/UserModel");

const app = express();
const PORT = process.env.PORT | 8000;

mongoose.connect(
  "mongodb://localhost/sittersynced",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("connected to MongDB")
);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["helloworld"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(null, user);
  });
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record!
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.image,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

app.get("/auth/google", googleAuth);

app.get("/auth/google/callback", googleAuth, (req, res) => {
  res.redirect("http://localhost:3000/user/profile");
});

app.get("/api/current_user", (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

app.get("/api/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

module.exports = app.listen(PORT, () => {
  console.log(`Node.js listening on ${PORT}`);
});
