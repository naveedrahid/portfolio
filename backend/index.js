const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();



mongoose.connect(process.env.MONGO_DB , {
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
