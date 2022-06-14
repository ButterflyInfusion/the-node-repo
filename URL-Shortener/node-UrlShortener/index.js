const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


const { connection } = require('mongoose')
const connectDB = require('./config/db')

const app = express();

app.use(express.static(__dirname + '/public'))

//Initialize EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//body Parser
app.use(express.urlencoded({extended:false}))


//connect to database
connectDB();

app.use(express.json({extended: false}))


//define routes
app.use('/', require('./routes/url'))
app.use('/url', require('./routes/url'))
app.use('/', require('./routes/app'))

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));