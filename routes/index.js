var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  const userId = req.session.passport.user;

  // console.log('userId', userId);
  // Do mongoose call to get User object
  // Pass in user object into the render function
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', ensureAuthenticated, function (req, res, next) {
  const userId = req.session.passport.user;
  User.find({})
  .then(user => {
    res.render('dashboard', { user: user });
  });

});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}

module.exports = router;
