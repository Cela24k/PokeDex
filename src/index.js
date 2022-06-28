"use strict";
exports.__esModule = true;
var result = require('dotenv').config();
var mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");
var http = require("http");
var bodyparser = require("body-parser");
var colors = require("colors");
var user_1 = require("./models/user");
colors.enabled = true;
var app = express();
app.use(cors());
app.use(bodyparser.json());
var server = http.createServer(app);
mongoose.connect(process.env.DB_URI)
    .then(function () {
    var data = { username: 'admin', email: 'admin', digest: 'admin' };
    console.log('Connected to DB'.rainbow.bgWhite);
    server.listen(8080, function () { return console.log("HTTP Server started at http://localhost:8080"); });
    (0, user_1.newUser)(data).save();
})["catch"](function (err) {
    console.log("Error Occurred during initialization");
    console.log(err);
});
