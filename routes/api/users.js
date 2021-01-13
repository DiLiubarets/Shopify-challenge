const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev");
const passport = require("passport");
const sensor = require("./sensor");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateDeleteInput = require("../../validation/delete");

// Load User model
const User = require("../../models/User");

router.post("/register", (req, res) => {
 
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const apiKey = GenerateAPIkey();
      console.log(apiKey);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        apiKey: apiKey,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  console.log("/login")
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(400).json({ email: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          apiKey: user.apiKey,
          userEmail: user.email,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.secretOrKey || keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ password: "Password incorrect" });
      }
    });
  });
});

router.post("/delete", (req, res) => {
  // Form validation
  console.log("route is running");
  const { errors, isValid } = validateDeleteInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("route is running 2");
  //Checking if user exists
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .json({ email: "You can't delete a user that doesn't exist" });
    }
    // Check password
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        console.log("user matched");
        User.deleteOne({ email: user.email }, (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.send("working");
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/newKey", (req, res) => {
  // Form validation
  const currentKey = req.body.apiKey;
  const newKey = GenerateAPIkey();
  User.updateOne({ apiKey: currentKey }, { apiKey: newKey }, function (
    err,
    docs
  ) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      let socket = sensor.socketGetter(currentKey);
      sensor.socketCleaner(currentKey);
      sensor.socketSetter(newKey, socket);
      res.json(newKey);
    }
  });
});
function GenerateAPIkey() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
module.exports = router;
