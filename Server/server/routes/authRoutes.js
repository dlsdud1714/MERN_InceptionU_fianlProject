var express = require("express");
var router = express.Router();
var debug = require("debug")("server:routes");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { userByName } = require("../../model/userModel");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await userByName(username);
      if (!user) {
        return done(null, false);
      }
      const passwordsMatch = password === user.password;
      if (!passwordsMatch) {
        return done(null, false);
      }
      const isActive = user.inactive === false;
      if (!isActive) {
        return done(null, false);
      }

      const userToSend = {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        inactive: user.inactive,
        id: user.idUser,
      };
      // delete userToSend.password;
      // console.log("user after deleting password", userToSend);
      return done(null, userToSend);
    } catch (error) {
      return done(error, null);
    }
  })
);

passport.serializeUser(function (user, done) {
  // console.log("passport wants to store this user in a cookie", user);
  done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
  // console.log(
  //   "passport is trying to recover the user from the cookie",
  //   username
  // );
  try {
    const user = await userByName(username);
    if (!user) {
      done(new Error("User not found or deleted"));
      return;
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

router.get("/loggedInUser", (req, res) => {
  if (req.user) {
    const userToSend = {
      username: req.user.username,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      inactive: req.user.inactive,
      id: req.user.idUser,
    };
    res.json(userToSend);
  } else {
    res.status(400).send(null);
  }
});

module.exports = router;
