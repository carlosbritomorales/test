const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const engine = require('ejs-mate');

const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

require('../database');
require('./passport/local-auth');

//fechas
moment.locale('es');

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
   //console.log(req.user);
   app.locals.signupMessage = req.flash('signupMessage');
   app.locals.signinMessage = req.flash('signinMessage');
   app.locals.userdataMessage = req.flash('userdataMessage');
   app.locals.user = req.user;
   next();
})

//routes

// routes
app.use(require('./routes'));

// sockets
require('./sockets')(io);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
server.listen(3000, () => {
  console.log('Server on port', 3000);
});
