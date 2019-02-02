const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env;

// CONTROLLERS
const ac = require('./controllers/authcontroller.js')

const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log("i'm a lead farmer muthafucka!");
});

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));

//AUTH
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/logout', ac.logout);

app.listen(SERVER_PORT, () => {
    console.log('i need some goddamn jellybeans', SERVER_PORT)
})