const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: String
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;