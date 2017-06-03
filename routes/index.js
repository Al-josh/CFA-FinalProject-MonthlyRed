var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Cart = require('../models/Cart');
var Product = require('../models/Product');


/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log('userId', userId);
  // Do mongoose call to get User object
  // Pass in user object into the render function
  res.render('home', { title: 'Express' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/dashboard', ensureAuthenticated, ensureAdmin, function (req, res, next) {
  const userId = req.session.passport.user;
  User.find({})
  .then(user => {
    res.render('dashboard', { user: user });
  });
});

router.get('/addToShoppingcart/:id', ensureAuthenticated, function (req, res, next) {
  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productID, function (err, product) {
    if (err) {
      return res.redirect('/');
    }

    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/shoppingcart');
  });
});

router.get('/shoppingcart', function (req, res, next) {
  if (!req.session.cart) {
    return res.render('shoppingCart', { products: null });
  }

  var cart = new Cart(req.session.cart);
  res.render('shoppingCart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

router.get('/checkout', function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shoppingcart');
  }
  var cart = new Cart(req.session.cart);
  res.render('checkout', { total: cart.totalPrice });
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}

function ensureAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  } else {
    req.flash('error_msg', 'You are not permitted to enter this page');
    res.redirect('/');
  }
}

module.exports = router;
