const express = require('express'); //its importing the dependency, in Node.js we use require

const expressLayouts = require('express-ejs-layouts') //this is to render templates
//ejs will be the extension eg index.ejs
//ejs stands for embedded javascript. its just like a html template in javascript

const app = express();  //initialize the app


//initialize EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')




//Routes
app.use('/', require('./routes/app'));

app.use('/users', require('./routes/user'));



const PORT = process.env.PORT || 5000 //create a port.
//the first part, (process.env.PORT), is incase we are going to deploy, 
//the second part (5000) is our default server, so it will run on "localhost:5000"

app.listen(PORT, console.log(`Server cooking on port ${PORT}`)) //notice i have used back ticks in order to use the PORT variable 
//if it runs, it will console log 'Server cooking on port 5000'