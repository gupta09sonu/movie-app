const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// create mongoose connection string
const db = "mongodb+srv://root:root@cluster0.nwzfp.mongodb.net/kotakdb?retryWrites=true&w=majority";

// create database connection
mongoose.connect(db, (err)=>{
    if(err){
        console.log('databse connection error', err);
    } else{
        console.log('Mongodb server connected!!!');
    }
});

// create router for making api's
const router = express.Router();

// get api
router.get('/',(req,res)=>{
    res.status(200).send({message: "from api routes"});
});

// user login api
router.post('/login',(req,res)=>{
    let loginData = req.body;
    User.findOne({email: loginData.email},(err,data)=>{
        if(err){
            console.log('Email',err);
            res.status(501).send({message: "database connection issue"})
        } else if(!data){
            res.status(401).send({message: "Invalid email"});
        } else if(data.password !== loginData.password){
            res.status(401).send({message: "Password is incorrect"});
        } else{
            let payload = {subject: data._id};
            let token = jwt.sign(payload, 'secretkey');
            res.status(200).send({message: "Login Successfull", token});
        }
    });
});

// user registeration api
router.post('/register',(req,res)=>{
    let userData = req.body;
    let user = new User(userData);

    // save the userdata in the mongoose
    user.save((err,registeredData)=>{
        if(err){
            console.log(err);
        } else{
            let payload = {subject: registeredData._id};
            let token = jwt.sign(payload, 'secretkey');
            res.status(200).send({token});
        }
    });
});


// export the router
module.exports = router;