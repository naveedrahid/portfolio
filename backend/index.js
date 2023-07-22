const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const Users = require('./model/userModel');

// Middleware to parse incoming JSON data
app.use(express.json());

mongoose.connect(process.env.MONGO_LOCAL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected now');
}).catch((err) => console.log('not connected'));

app.get('/', async (req, resp) => {
    await resp.send('Your Localhost is running');
});

app.post('/users', async (req, res) => {
    try {
        const newUser = await Users.create({
            username: req.body.username,
            email: req.body.email,
            age: req.body.age,
        });

        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

const localPort = process.env.PORT;
const server = async () => {
    try {
        app.listen(localPort, () => {
            console.log(`${localPort} is connected`);
        });
    } catch (error) {
        console.log(error);
    }
};

server();
