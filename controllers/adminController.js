var mongoose = require('mongoose');
var Order = require('../models/Order');
var User = require('../models/User');
var Quiz = require('../models/Quiz')


exports.getDashboard = (req, res, next) => {
  User.find({})
.then(user => {
    res.render('adminDashboard', { user: user });
  });
};

exports.getDashboardOrders = (req, res, next) => {
  Order.find({})
  .then(order => {
    res.render('adminorders', { order: order });
  });
};

exports.getQuizResults = (req, res, next) => {
  Quiz.find({})
  .then(quiz => {
    res.render('quizresults', { quiz: quiz });
  });
};
