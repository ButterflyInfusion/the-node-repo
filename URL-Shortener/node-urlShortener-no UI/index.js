const express = require('express');
const { connection } = require('mongoose');
const connectDB = require('./config/db')

const app = express();

//connect to database
connectDB();

app.use(express.json({extended: false}))


//Define routes
app.use('/', require('./routes/app'))

app.use('/api/url', require('./routes/url'))

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));