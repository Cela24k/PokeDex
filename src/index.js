"use strict";
exports.__esModule = true;
var result = require('dotenv').config();
var mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");
var http = require("http");
var bodyparser = require("body-parser");
var colors = require("colors");
var authRoutes = require("./routes/auth-routes");
colors.enabled = true;
var app = express();
app.use(cors());
app.use(bodyparser.json());
var server = http.createServer(app);
app.get("/", function (req, res) {
    res.status(200).json({ api_version: "1.0", endpoints: ["/auth", "/user"] });
});
app.use('/auth', authRoutes);
mongoose.connect(process.env.DB_URI)
    .then(function () {
    console.log('Connected to DB'.rainbow.bgBlack);
    server.listen(8080, function () { return console.log("HTTP Server started at http://localhost:8080"); });
})["catch"](function (err) {
    console.log("Error Occurred during initialization");
    console.log(err);
});
