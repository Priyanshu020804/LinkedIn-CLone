const express = require('express');
const router = express.Router();
const User =require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register' , async (req,res) => {
    // this function will handle the logic to register user

    // get details from req.body
    const {firstName , lastName , email, password} = req.body;
    if(!firstName || !email || !password){
        return res.status(400).json({err : "Invalid Request Body"});
    }

    // check if a user with thta email exists or not
    const existingUser = await User.findOne({email:email});
    if(existingUser){
        return res.status(402).json({err : "User With this Email Already Exists"});
    }
    // for legitimate user, create the user
    // encrypt the password by Hashing
    const hashedPassword = await bcrypt.hash(password , 10)
    const newUserDetails = {firstName , lastName , email, password:hashedPassword};
    const newUser = await User.create(newUserDetails);

    // Create a JWT token and return it to the user

});