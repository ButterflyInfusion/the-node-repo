const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs') //to decrypt the stored hashed password


//Load User Model
const user = require('../models/Users')

//You notice I did not import passport, we will be passing it as a function from app.js 

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => { //username field can be name, but here we will use email. "done" is a callback that you need to call once you are done with your work
          //we check if there is a user with the email being posted
          //Match User
          user.findOne({email:email}) //we query the database to check the email. which returns a promise
          .then(user =>{
             if (!user) { //if the user does not exist
                 return done(null, false, {message: "That email is not registered"}) //will display this message
             }
             //return done returns null for errors, false for the user
          
          //Match the password
          bcrypt.compare(password, user.password, (err, isMatch) => { //this compares the password being posted to the hashed password. isMatch is a boolean (true or false), should return true
             if(err) throw err;

             if(isMatch) {
                 return done(null, user) //return done returns the user if password match
             } else { //if passwords dont match
                 return done(null, false, {message: "Password incorrect"});
             }
          });
          })  
          .catch( err => console.log(err)) //display any errors if there is any    
        }) 

        );
        //this is to serialize user sessions
        //if you log in, passport created a serialized instance for your session
        passport.serializeUser(function(user, done) {
            done(null, user.id);
          });
        
          passport.deserializeUser(function(id, done) {
            user.findById(id, function(err, user) {
              done(err, user);
            });
          });
    }