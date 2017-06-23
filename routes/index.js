var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var SN = require('../models/servicenow');
var router = express.Router();
var sn = require('../sn-calls/table');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    user: req.user
  });
});

router.get('/login',
  function(req, res) {
    res.render('login');
  });

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

router.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    res.render('profile', {
      user: req.user
    });
  });

router.get('/signup',
  function(req, res) {
    res.render('signup', {
      user: req.user
    });
  });

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

module.exports = router;
