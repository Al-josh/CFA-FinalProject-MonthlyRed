var mongoose = require('mongoose');
var Product = require('../models/Product');
var Cart = require('../models/Cart');

exports.addToShoppingcart = (req, res, next) => {
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
};

exports.reduceCart = (req, res, next) => {
  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productID);
  req.session.cart = cart;
  res.redirect('/shoppingcart');
};

exports.emptyCart = (req, res, next) => {
  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productID);
  req.session.cart = cart;
  res.redirect('/shoppingcart');
};

exports.getShoppingCart = (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shoppingCart', { products: null });
  }

  var cart = new Cart(req.session.cart);
  res.render('shoppingCart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
};
