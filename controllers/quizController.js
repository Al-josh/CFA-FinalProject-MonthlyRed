var mongoose = require('mongoose');
var Quiz = require('../models/Quiz')

exports.getQuiz = (req, res, next) => {
  res.render('quiz', { title: 'Quiz' });
};

exports.postQuiz = (req, res, next) => {
  var quiz = new Quiz({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    answer4: req.body.answer4,
    answer5: req.body.answer5,
  });
  console.log('QUIZZZZ:', quiz);
  quiz.save(function (err, answers) {
    if (err) {
      console.log('QUIZ ERRRR:', err);
    };

    res.redirect('/shoppingcart');
  });
};
