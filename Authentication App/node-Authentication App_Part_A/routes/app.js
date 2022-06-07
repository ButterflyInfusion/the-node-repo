const express = require('express')

const router = express.Router(); 

router.get('/', (req, res) => res.render('welcome')); //adding the route page, should render welcome.ejs

module.exports = router; //to export, and use it in other files