const express = require('express')

const router = express.Router();

const Url = require('../models/Url')

router.get('/:code', async(req, res) => {
   try {
       const url = await Url.findOne({urlCode: req.params.code});

       if(url) {
           return res.redirect(url.link);
       } else {
           return res.status(404).json('no url found');
       }
   } catch(err) {
       console.log(err);
       res.status(500).json('Server Error')
   }
})

module.exports = router