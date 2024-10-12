const express = require('express');
const cors = require('cors');
require('./db/db')
const {readdirSync} = require('fs');
require('./models/Income');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

readdirSync('./routes').map((route)=>app.use('/api/v1', require('./routes/'+route)))

const server = ()=>{
    app.listen(PORT, ()=>{
        console.log('listening to Port')
    })
}

server();