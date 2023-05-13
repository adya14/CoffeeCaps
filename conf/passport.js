const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
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
      clientID:'412230087220-aq7kn1ms7sac8v28gastnmn9frbfp9gj.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
  //   function(accessToken, refreshToken, profile, cb) {
  //     User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
  //       return cb(err, user);
  //     });
  //   }
  // ));


//{
  
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          if (!profile || !profile.id) {
            // handle the error condition here
            throw new Error("Invalid profile data.");
          }
          

          //get the user data from google 
          const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0]?.value,
            email: profile.emails[0]?.value
          }

          //find the user in our database 
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }  
      }))
//     )
//   )

//   // used to serialize the user for the session
//   passport.serializeUser((user, done) => {
//     done(null, user.id)
//   })

//   // used to deserialize the user
//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   })

  // Add the home page URI as the successRedirect option
  passport.authenticate('google', { successRedirect: '/login' });
}

