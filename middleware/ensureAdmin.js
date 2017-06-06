var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

function ensureAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  } else {
    req.flash('error_msg', 'You are not permitted to enter this page');
    res.redirect('/');
  }
}

module.exports = ensureAdmin;
