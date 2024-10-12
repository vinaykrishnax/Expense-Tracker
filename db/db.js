const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.gfrb94c.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('connected to database');
})
.catch((err)=>{
    console.log(err);
})