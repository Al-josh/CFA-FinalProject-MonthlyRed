require('dotenv').config();
var express = require('express');
var expressValidator = require('express-validator');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MonthlyRed');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to db');
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
      var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }

      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
}));

app.use(flash());

// error handler
// app.use(function (err, req, res, next) {
// set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get('env') === 'development' ? err : {};

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.set('port', (3001));

app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'));
});

// render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
