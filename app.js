var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('./config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

const db = process.env.MONGODB_URL

mongoose.connect(db,{useNewUrlParser:true})
.then(()=>{
  console.log('Connected to Server'); 
})
.catch((err=>{
  console.log(err);
}))


var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var favoritesRouter = require('./routes/favoritesRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())
app.use(passport.initialize())

//Routes
app.use('/outlets', indexRouter);
app.use('/users', usersRouter);
app.use('/favorites', favoritesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
