var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var ensureAdmin = require('../middleware/ensureAdmin');
var ensureAuthenticated = require('../middleware/ensureAuthenticated');
var userController = require('../controllers/userController');
var orderController = require('../controllers/orderController');

router.get('/login', userController.getLogin);

router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/profile', ensureAuthenticated, userController.getProfile);
router.post('/profile', ensureAuthenticated, userController.postProfile);

router.get('/myorders', ensureAuthenticated, orderController.getMyOrders);

router.get('/auth/facebook', passport.authorize('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/users/profile', failureRedirect: '/users/login' }));

router.post('/login', passport.authenticate('local', { successRedirect: '/users/profile', failureRedirect: '/users/login', failureFlash: true }), function (req, res) {
    res.redirect('/');
  });

router.get('/logout', userController.getLogout);

module.exports = router;
