const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const DB = 'mongodb+srv://portfolioUser:Pixel99@cluster0.ijdzqei.mongodb.net/portfoliodb?retryWrites=true&w=majority';

mongoose.connect(DB, {
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false
}).then(() => {
    
    console.log('connected now');
})
.catch((err)=>console.log('not connected'));

app.get('/', async (req,resp) =>{
    await resp.send('Your Localhost is running');
});
const localPort = process.env.PORT;

const server = async () => {
    try {
        app.listen(localPort, () =>{
            console.log(`${localPort} is connect`);
        });
    } catch (error) {
        console.log(error);
    }
}

server();
