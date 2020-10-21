import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config.js'
import mongoose from 'mongoose'
import multer from 'multer';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import path from 'path';
import {EDESTADDRREQ} from 'constants';
import { ppid, title } from 'process';
import JSDOM from 'jsdom';
import moment from 'moment';
import cors from 'cors';

//Importing routes
import allArticles from './routes/articles.js'
import allUsers from './routes/users.js'

moment().format();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer();
let date = new Date();

const app = express();
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Methods' , 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers' , 'Content-Type');
    next();
});

app.use('/articles' , allArticles);
app.use('/users' , allUsers);
app.use(cors());
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/../public')));


                // The home route
// app.route("/")
//     .get((req, res) => {
//         // res.sendFile(path.resolve(__dirname + '/../index.html'));
//         res.send({message : "Server is working properly"});
//     });

let PORT = process.env.PORT;
app.listen(PORT || 3000, console.log(`Server is running on port 3000`));