var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/User');
var Product = require('../models/Product');
var Order = require('../models/Order');
var Cart = require('../models/Cart');

/* GET users listing. */
router.get('/register', function (req, res, next) {
  res.render('register');
});

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/register', function (req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var password2 = req.body.password2;
  var ageConfirmation = req.body.ageConfirmation;

  //Validation
  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('ageConfirmation', 'Please confirm if you are 18 years of age of older').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors,
    });
  } else {
    var newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
      });
    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login');
    res.redirect('login');
  }
});

router.get('/profile', ensureAuthenticated, function (req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find({})
  .then(products => {
    res.render('profile', { title: 'Profile', products: products, successMsg: successMsg, noMessages: !successMsg });
  });
});

router.get('/myorders', ensureAuthenticated, function (req, res, next) {
  Order.find({ user: req.user }, function (err, orders) {
    if (err) {
      return res.write('Error!');
    }

    var cart;
    orders.forEach(function (order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });

    res.render('myorders', { title: 'Profile', orders: orders });
  });
});

router.post('/profile', ensureAuthenticated, function (req, res, next) {
  const name = req.body.productName;
  const description = req.body.productDescription;
  const price = req.body.productPrice;
  let product = new Product();
  product.name = name;
  product.description = description;
  product.price = price;
  console.log(product);
  product.save()
    .then(() => {
      res.redirect('/');
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

//1 change authenticate to authorize
router.get('/auth/facebook', passport.authorize('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/users/profile', failureRedirect: '/users/login' }));

router.post('/login', passport.authenticate('local', { successRedirect: '/users/profile', failureRedirect: '/users/login', failureFlash: true }), function (req, res) {
    res.redirect('/');
  });

router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
