"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const hypothesesRouter = require("./routes/hypotheses");
const logger = require("morgan");
const bodyParser = require("body-parser");
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use('/api', hypothesesRouter);
app.use(function (req, res, next) {
    const NotFound = {
        status: 404,
        message: 'Page not found'
    };
    next(NotFound);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});
module.exports = app;
