const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },

    shortUrl: {
       type: String,
       required: true
    },

    urlCode: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

    
});

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url