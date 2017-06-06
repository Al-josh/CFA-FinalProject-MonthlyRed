var mongoose = require('mongoose');
var Order = require('../models/Order');
var Cart = require('../models/Cart');
var configAuth = require('../config/auth');

exports.getMyOrders = (req, res, next) => {
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
};

exports.getCheckout =  (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect('/shoppingcart');
  }

  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('checkout', { total: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
};

exports.postCheckout = (req, res, next) => {
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
};
