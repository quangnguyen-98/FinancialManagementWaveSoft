require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hopDongController = require('./controllers/hopDongs.Controller');

//Khai báo short-id
var ids = require('short-id');
ids.configure({
    length: 8,          // The length of the id strings to generate
    algorithm: 'sha1',  // The hashing algoritm to use in generating keys
    salt: Math.random   // A salt value or function
});

//Khai báo router
var indexRouter = require('./routes/index.Route');
var authRouter = require('./routes/auth.Route');
var adminRouter = require('./routes/admin.Route');
var managersRouter = require('./routes/managers.Route');
var usersRouter = require('./routes/users.Route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// view engine setup (web service không dùng view)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/managers', managersRouter);
app.use('/api/v1/users', usersRouter);


var CronJob = require('cron').CronJob;
// var job = new CronJob('00 00 1 * * *', function() {
//    hopDongController.CheckTrangThaiHopDongMoiNgay();
// }, null, true, 'Asia/Ho_Chi_Minh');
// job.start();
var job2 = new CronJob('1 * * * * *', function() {
    hopDongController.CheckTrangThaiHopDongMoiNgay();
}, null, true, 'Asia/Ho_Chi_Minh');
job2.start();

module.exports = app;
