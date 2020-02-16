const express = require('express');
const app = express();
const mongoose = require('mongoose');
const movieService = require('./service/movieService');
const userSevice = require('./service/userService');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());
app.listen(3000, ()=>{
    console.log('server up and running')
});
app.use('/login', userSevice);
app.use('/movies', movieService);

app.get('/', (req, res)=>{
    res.send('Helllloooo');
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,useUnifiedTopology: true }, ()=>{
    console.log('connected to mongodb!')
})