const express = require('express');
const router = express.Router();
const url = require('../models/Url');

//welcome page
router.get('/', (req, res)=> res.render('welcome'))


module.exports = router