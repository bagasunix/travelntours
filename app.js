require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connection Successful!"));


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());
// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
// Limit requests from same API
const limiter = rateLimit({
    max: 5,
    windowMs: 05 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  });
app.use("/api", limiter);
// Body parser, reading data from body into req.body
app.use(express.json());
// app.use(express.json({ limit: "10kb" }));
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
