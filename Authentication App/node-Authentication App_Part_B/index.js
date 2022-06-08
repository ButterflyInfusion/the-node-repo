const express = require('express'); //its importing the dependency, in Node.js we use require

const expressLayouts = require('express-ejs-layouts') //this is to render templates
//ejs will be the extension eg index.ejs
//ejs stands for embedded javascript. its just like a html template in javascript

const flash = require('connect-flash') //do display flash messages

const session = require('express-session') //use sessions in our app

const passport = require('passport') //importing passport

//Passport config
require('./config/passport')(passport);

const mongoose = require('mongoose');  //to connect with mongoDB Database


const app = express();  //initialize the app

//MongoDB Configuration
const db = require('./config/keys').mongoURI; //we are getting the mongoDB uri from the keys.js file

//Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true}) //this wil return a promise
.then(() =>console.log('MongoDB connection successful')) //if the connection works it will print out this 
.catch(err => console.log(err)) //if the connection refuses, it will print out the error

//initialize EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Bodyparser
app.use(express.urlencoded({extended:false})); //now we can get data from out form with request.body

//Express session middleware  - i got this from the documentation (express-session documentation)
app.use(session({
    secret: 'secret', //this could be anything
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());

//Global Variables for the display message
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); //for success messages
    res.locals.error_msg = req.flash('error_msg'); //for error messages
    res.locals.error = req.flash('error'); //for login-error message
    next();
}) 

//Routes
app.use('/', require('./routes/app'));

app.use('/users', require('./routes/user'));



const PORT = process.env.PORT || 5000 //create a port.
//the first part, (process.env.PORT), is incase we are going to deploy, 
//the second part (5000) is our default server, so it will run on "localhost:5000"

app.listen(PORT, console.log(`Server cooking on port ${PORT}`)) //notice i have used back ticks in order to use the PORT variable 
//if it runs, it will console log 'Server cooking on port 5000'