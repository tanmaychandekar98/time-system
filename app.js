var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose=require('mongoose');
var passport = require('passport');
var config = require('./config/database');

//Databse connection
mongoose.connect(config.database);
var db=mongoose.connection;

db.once('open',function(){
	console.log("Connected to time-system");
});
db.on('error',function(err){
	console.log(err);
});


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express-session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
  
}));

//Passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//user global var
app.get('*',function(req,res,next){
  res.locals.user=req.user || null;
  next();
});


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
