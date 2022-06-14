const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')
const router = express.Router();

const Url = require('../models/Url');

router.get('/', (req,res) => res.render('home'))

router.get('/shorten', (req, res) => res.render('shorten'))

router.get('/result', (req, res) => res.render('result'))

router.post('/shorten', async(req, res) => {
    const {link, shortUrl} = req.body;
    const baseUrl = config.get('baseUrl');
    let errors = [];

    //Check if empty
    if(!link) {
        errors.push({msg: 'Please fill in the fields'})
    }
    

    //check base url
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).isUri()
    }

    const urlCode = shortid.generate();

    //check long url
    if (validUrl.isUri(link)) {
        try {
            let url = await Url.findOne({ shortUrl });
            

            if (url) {
               res.render('result', {new:url.link, url:url.shortUrl, code:url.urlCode, date:url.date})
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                

                url = new Url({link, shortUrl, urlCode, date: new Date()})

                console.log(url)

                await url.save()

                res.render('result', {new:url.link, url:url.shortUrl, code:url.urlCode, date:url.date})
            } 
        } catch (err) {
            console.log(err);
            res.status(500).json('server error')
        }
    } else {
        res.status(401).json('Invalid long URL')
    }
})

module.exports = router