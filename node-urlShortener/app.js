const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash/lib/flash');


//init app
const app = express()

//DB config
const db = require('./config/keys').MongiURI;


//connect to mongo
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Body Parser
app.use(express.urlencoded({extended: false}))

//connect flash
app.use(flash());

//Routes
app.use('/', require('./routes/index'));
app.use('/url', require('./routes/settings'))




//server
const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))