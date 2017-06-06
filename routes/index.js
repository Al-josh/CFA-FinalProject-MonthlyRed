var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Cart = require('../models/Cart');
var Product = require('../models/Product');
var configAuth = require('../config/auth');
var Order = require('../models/Order');

/* GET home page. */
router.get('/', function (req, res, next) {
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

router.get('/dashboard/orders', ensureAuthenticated, ensureAdmin, function (req, res, next) {
  Order.find({})
  .then(order => {
    res.render('adminorders', { order: order });
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

router.get('/reduce/:id', ensureAuthenticated, function (req, res, next) {
  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productID);
  req.session.cart = cart;
  res.redirect('/shoppingcart');
});

router.get('/remove/:id', ensureAuthenticated, function (req, res, next) {
  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productID);
  req.session.cart = cart;
  res.redirect('/shoppingcart');
});


router.get('/shoppingcart', ensureAuthenticated, function (req, res, next) {
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
  var errMsg = req.flash('error')[0];
  res.render('checkout', { total: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
});

router.post('/checkout', function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shoppingcart');
  }

  var cart = new Cart(req.session.cart);
  var stripe = require('stripe')(configAuth.STRIPE_TEST_SECRET_KEY);

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: 'aud',
    source: req.body.stripeToken, // obtained with Stripe.js
    description: 'Test Charge',
  }, function (err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }

    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id,
    });
    console.log('orderrrrr!!!!!:', order);
    order.save(function (err, result) {
                if (err) {
                  console.log('ERROR ERROR ERROR', err);
                }

                req.flash('success', 'Successfully bought product!');
                req.session.cart = null;
                res.redirect('/');
              });
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

function ensureAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  } else {
    req.flash('error_msg', 'You are not permitted to enter this page');
    res.redirect('/');
  }
}

module.exports = router;
