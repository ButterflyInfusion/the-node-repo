const express = require('express')

const router = express.Router(); 

//Login Page
router.get('/login', (req, res) => res.render('login')); //adding the route page, should render login.ejs

//Register
router.get('/register', (req, res) => res.render('register')) //adding the route page, should render register.ejs


module.exports = router;