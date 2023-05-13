const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} =require('./middleware/authMiddleware');  
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

require('./conf/passport')(passport);

const app = express();

// mongoose.connect(process.env.MONGO_URI,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://somia:somiakumari@cluster0.otwaeyu.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

//cookies
app.get('/set-cookies', (req,res) => {
 // res.setHeader('Set-Cookie', 'newUser=true');
 res.cookie('newUser', false);
 res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 24, httpOnly: true});

  res.send('you got the cookies!');
});
app.get('/read-cookies' , (req,res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});

//OAuth
// Mongo & Template Setup
const PORT = process.env.PORT || 3000;

// Middleware & DB for Sessions Setup
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use(require("./routes/index"))
app.use('./auth', require('./routes/authRoutes'))

