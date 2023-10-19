const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Process
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register Process
router.post('/register', (req, res) => {
  // Handle registration logic here
  const { username, password } = req.body;
  User.create({ username, password })
    .then((user) => {
      res.redirect('/login');
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/register');
    });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});


module.exports = router;