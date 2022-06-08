const express = require('express')
const {ensureAuthenticated} = require('../config/auth') //We import Auth handler
const router = express.Router(); 

router.get('/', (req, res) => res.render('welcome')); //adding the route page, should render welcome.ejs

router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render('dashboard', {
    name: req.user.name
}));
module.exports = router; //to export, and use it in other files