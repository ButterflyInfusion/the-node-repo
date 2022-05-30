const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const validUrl = require('valid-url');
const config = require('config')

const Url = require('../models/Url')

const url = require('../models/Url')

//url page
router.get('/shorten', (req, res)=> res.render('shorten'))


//Url Post handle
router.post('/shorten', async (req, res) =>{
    const {longUrl} = req.body;
    const baseUrl = config.get('baseUrl')
    let errors = []
    
    //check base url
    if (!validUrl.isUri(baseUrl)) {
        errors.push({msg: 'invalid URL'})
    }

    //create url code
    const urlCode = shortid.generate()

    //check long url

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({longUrl});
            if(url) {
                res.render('url');
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode
                });
                await url.save().then(url =>{
                    res.render('url')
                });
                
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Server Error')
        }
    }else {
        res.status(401).json('invalid long url')
    }

})

router.get('/shorten/short', (req, res)=> res.send('shorten'))



module.exports = router