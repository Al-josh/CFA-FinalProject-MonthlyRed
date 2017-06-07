var mongoose = require('mongoose');
const { Schema } = mongoose;

var quizSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  answer1: {
    type: String,
  },
  answer2: {
    type: String,
  },
  answer3: {
    type: String,
  },
  answer4: {
    type: String,
  },
  answer5: {
    type: String,
  },
});

var Quiz = module.exports = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
