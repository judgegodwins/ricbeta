require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport')

var PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), 'views'));

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new FileStore(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));

app.use(passport.initialize());
app.use(passport.session());

var Student = require('./models/student');

var router = require('./routes/router');
var auth = require('./auth/auth')

mongoose.connect('mongodb://localhost:27017/RIC', {useNewUrlParser: true}, (err, db) => {
    if(!err) console.log('db sucessfully connected')
    router(app, Student);
    auth(app, Student)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))