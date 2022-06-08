const express = require('express');
const User = require('../models/Users');

const bcrypt = require('bcryptjs')

const router = express.Router(); 

const passport = require('passport')

//User model
const user = require('../models/Users') //navigate to the models folder, now we can use the Users model

//Login Page
router.get('/login', (req, res) => res.render('login')); //adding the route page, should render login.ejs

//Register page
router.get('/register', (req, res) => res.render('register')) //adding the route page, should render register.ejs

//Register Handle, POST request
router.post('/register', (req,res) => {
    const {name, email, password, password2} = req.body //store what is being posted in an array
    
    let errors = []
    //First before posting we need to validate the fields

    //check required fields

    //this will be done by an if statement

    if(!name || !email || !password || !password2) { 
        //if the field is empty the above statement will be true
       errors.push({msg: 'Please fill in all fields'}) //if this is true, there will be a message displayed 
    }


    //Check if passwords match
    if(password !== password2) { //if the first password is not equal to the second password
      errors.push({msg: "Passwords do not match"});
    }

    //Check password length
    if (password.length < 6) { //if the password is less than 6
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) { //if the errors array we had made receives any error
        res.render ('register', { //it will render the register page
            errors,  //display error
            //the details typed in the form wont disappear,
            name,
            email,
            password, 
            password2
        });
        
    } else {
       //Validation passes
       //before we submit a user we need to make sure the user does not exist
       //we query the database checking if the email address exists
       User.findOne({email:email}) //this is a mongoDB function to query one record with email
       .then(user => {
           if (user) {
               //user exists
               errors.push({msg: 'Email is already registered'}) //we add a new error, will display if the email exists
               res.render('register', { //renders the register page again, does not lose the form data
                   errors,
                   name,
                   email,
                   password,
                   password2
               });
           } else {
              const newUser = new User({ //when crating a new instance, we use the new keyword
                   name,
                   email,
                   password
              }); 

              //console.log(newUser)

              //Hash password
              //we need to generate a salt to hash the password
              bcrypt.genSalt(10, (err, salt) => //we use genSalt to generate a salt, the number (10) shows how many characters
                 bcrypt.hash(newUser.password, salt, (err, hash) => { //we get the password from newUser instance and hash it
                 if(err) throw err //incase of any errors
                 //set password to hashed
                 newUser.password = hash;

                 //save user to db
                 newUser.save() //this returns a promise
                 .then(user => {
                     req.flash('success_msg', 'You are now registered and can log in')//to load the success msg, after successful registration
                     res.redirect('/users/login'); //after saving the user, the page redirects to the login page
                 })
                 .catch(err => console.log(err)) //print out any errors if any
              }))
           }
       });
    }


});


//login handler
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {  //we use passport to authenticate
        successRedirect: '/dashboard', //if login is successful returns dashboard
        failureRedirect: '/users/login', //if login fails, redirects to login page
        failureFlash: true //to make sure message is displayed if it fails to login
    }) (req, res, next);
});

//logout handler
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {return next(err)
        
        } else {
          req.flash('success_msg', 'You are logged out');
          res.redirect('/users/login');
        }
        
    });
    
  });
 

module.exports = router;