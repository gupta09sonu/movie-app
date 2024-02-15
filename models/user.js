const mongoose = require('mongoose');

// create schema
const Schema = mongoose.Schema;

// create user schema
const userSchema = new Schema({
    email: String,
    password: String
});

// export the model
module.exports = mongoose.model('user', userSchema, 'users');