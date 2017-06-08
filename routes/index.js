var express = require('express');
var router = express.Router();
var ensureAdmin = require('../middleware/ensureAdmin');
var ensureAuthenticated = require('../middleware/ensureAuthenticated');
var pageController = require('../controllers/pageController');
var adminController = require('../controllers/adminController');
var cartController = require('../controllers/cartController');
var orderController = require('../controllers/orderController');
var quizController = require('../controllers/quizController');

router.get('/', pageController.getHome);
router.get('/about', pageController.getAbout);

router.get('/dashboard', ensureAuthenticated, ensureAdmin, adminController.getDashboard);
router.get('/dashboard/orders', ensureAuthenticated, ensureAdmin, adminController.getDashboardOrders);
router.get('/dashboard/quizresults', ensureAuthenticated, ensureAdmin, adminController.getQuizResults);

router.get('/addToShoppingcart/:id', ensureAuthenticated, cartController.addToShoppingcart);
router.get('/reduce/:id', ensureAuthenticated, cartController.reduceCart);
router.get('/remove/:id', ensureAuthenticated, cartController.emptyCart);
router.get('/shoppingcart', ensureAuthenticated, cartController.getShoppingCart);

router.get('/checkout', ensureAuthenticated, orderController.getCheckout);
router.post('/checkout', ensureAuthenticated, orderController.postCheckout);

router.get('/quiz', ensureAuthenticated, quizController.getQuiz);
router.post('/quiz', ensureAuthenticated, quizController.postQuiz);


module.exports = router;
