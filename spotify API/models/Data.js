const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    query: {
        type: String,
        
        
        
    },

    filter: {
        type: String, 
       
        
      
    },

    musicTitle: {
        type: Array,
        default: [],
        
        
    },

    albumCover: {
        type: Array,
        default: [],
        
    }

});

const Data = mongoose.model('Data', dataSchema)

module.exports = Data