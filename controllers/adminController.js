var mongoose = require('mongoose');
var Order = require('../models/Order');

exports.getDashboard = (req, res, next) => {
  User.find({})
.then(user => {
    res.render('dashboard', { user: user });
  });
};

exports.getDashboardOrders = (req, res, next) => {
  Order.find({})
  .then(order => {
    res.render('adminorders', { order: order });
  });
};
