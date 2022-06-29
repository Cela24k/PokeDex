const result = require('dotenv').config();
import mongoose = require('mongoose');
import express = require('express');
import cors = require('cors');
import http = require('http');
import bodyparser = require('body-parser');
import colors = require('colors');
import { getModel, newUser } from './models/user';
import authRoutes = require('./routes/auth-routes');

colors.enabled = true;
const app = express();
app.use(cors());
app.use(bodyparser.json())

var server = http.createServer(app);

app.get("/", (req, res) => {
    res.status(200).json({ api_version: "1.0", endpoints: ["/auth", "/user"] });
});

app.use('/auth', authRoutes);

mongoose.connect(process.env.DB_URI)
    .then(
        () => {
            console.log('Connected to DB'.rainbow.bgBlack);            
            server.listen(8080, () => console.log("HTTP Server started at http://localhost:8080"));
        }
    ).catch(
        (err) => {
            console.log("Error Occurred during initialization");
            console.log(err);
        }
    )


