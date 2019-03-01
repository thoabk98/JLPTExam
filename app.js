const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const session = require('express-session');

const app = express();
const RootRouter = require('./app/routes/root_router');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    name: 'app.sid',
    secret: 'qwer1235%@$',
    resave: false,
    saveUninitialized: true
}));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(upload());
app.use(express.static(path.join(__dirname, 'acsset')));
app.use(express.static(path.join(__dirname, 'data')));
app.use('/', new RootRouter().getRouter());
app.set('trust proxy', 1) // trust first proxy



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(5000);
module.exports = app;