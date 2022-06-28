const result = require('dotenv').config();
import mongoose = require('mongoose');
import express = require('express');
import cors = require('cors');
import http = require('http');
import bodyparser = require('body-parser');
import colors = require('colors');
import { getModel, newUser } from './models/user';

colors.enabled = true;
const app = express();
app.use(cors());
app.use(bodyparser.json())

var server = http.createServer(app);

mongoose.connect(process.env.DB_URI)
    .then(
        () => {
            let data = {username: 'admin', email:'admin', digest:'admin'};
            console.log('Connected to DB'.rainbow.bgWhite);            
            server.listen(8080, () => console.log("HTTP Server started at http://localhost:8080"));
            newUser(data).save();

        }
    ).catch(
        (err) => {
            console.log("Error Occurred during initialization");
            console.log(err);
        }
    )


