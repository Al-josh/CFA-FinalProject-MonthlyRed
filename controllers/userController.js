var mongoose = require('mongoose');
var User = require('../models/User');
var Product = require('../models/Product');

exports.getRegister = (req, res, next) => {
    res.render('register');
  };

exports.postRegister = (req, res, next) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var username = req.body.username;
    var deliveryAddress = req.body.deliveryAddress;
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
    req.checkBody('deliveryAddress', 'Delivery Address is required').notEmpty();
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
          deliveryAddress: deliveryAddress,
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
  };

exports.getLogin = (req, res, next) => {
  res.render('login');
};

exports.getProfile = (req, res, next) => {
  var successMsg = req.flash('success')[0];
  Product.find({})
  .then(products => {
    res.render('profile', { title: 'Profile', products: products, successMsg: successMsg, noMessages: !successMsg });
  });
};

exports.postProfile = (req, res, next) => {
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
};

exports.getLogout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
};
