const express = require('express')

const expressLayouts = require('express-ejs-layouts')

const mongoose = require('mongoose');  

const app = express()

//get mongoDB key
const db = require('./config/keys').mongoURI

//connnect to mongoDB
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('connection success'))
.catch(err => console.log(err))


//init ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')

//body parser
app.use(express.urlencoded({extended: false}))

//routes
app.use('/', require('./routes/app'))


const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`server port ${PORT}`))

