const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({  //here we create an object with the fields
   name: {
       type: String,
       required: true //so that it does not pass a null value
   },

   email: {
       type: String,
       required: true
   },

   password: {
     type: String,
     required: true
   },
   date: {
       type: Date,
       default: Date.now //this is a default value. Not being passed by the user
   }
});


const User = mongoose.model('User', userSchema); //creating the model and storing it in a variable
//In summary the table name is User, with the fields, name, email, password and date

module.exports = User //exporting the variable so we can use it in other files