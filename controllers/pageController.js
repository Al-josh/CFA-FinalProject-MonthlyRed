var mongoose = require('mongoose');

exports.getHome = (req, res, next) => {
  res.render('home', { title: 'Express' });
};

exports.getAbout = (req, res, next) => {
  res.render('about', { title: 'About' });
};
