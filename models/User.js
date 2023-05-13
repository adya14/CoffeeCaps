const mongoose = require('mongoose');
const {isEmail} = require('validator'); 
const bcrypt = require('bcrypt');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

//medium
const userSchema = new mongoose.Schema ({
  username: String,
  name: String,
  googleId: String,
  secret: String
});

// const userSchema = new mongoose.Schema({
//  email: {
//     type: String,
//     required: [true, 'Please enter an email'],
//     unique: true,
//     lowercase: true,
//     validate:[isEmail, 'Please enter a valid email']
//  },
//  password: {
//     type:String,
//     required: [true,'Please enter an password'],
//     minLength: [6, 'Minimum password length is 6 characters']
//  },   
// });

// fire a function after doc saved to db
userSchema.post('save' , function(doc,next) {
   console.log('new user was created & saved, doc');
   next();
});

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
   const user = await this.findOne({email});
   if(user){
     const auth = await bcrypt.compare(password, user.password);
     if(auth){
      return user;
     }
     throw Error('incorrect password');
   }
   throw Error('incorrect email');
   }

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('user',userSchema);

//medium
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID: '412230087220-aq7kn1ms7sac8v28gastnmn9frbfp9gj.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = User; 

//OAuth
// const UserSchema = new mongoose.Schema({
//   googleId: {
//     type: String,
//     required: true,
//   },
//   displayName: {
//     type: String,
//     required: true,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   email:{
// type:String,
// required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// })



module.exports = mongoose.model('User', userSchema)

