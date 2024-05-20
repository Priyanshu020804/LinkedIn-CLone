const express = require('express');
const router = express.Router();
const User =require('../models/User');
const bcrypt = require('bcrypt');
const {getToken} =require("../utils/helpers");

router.post('/register' , async (req,res) => {
    // this function will handle the logic to register user

    // get details from req.body
    const {firstName , lastName , email, password} = req.body;
    if(!firstName || !email || !password){
        return res.status(400).json({err : "Invalid Request Body"});
    }

    // check if a user with that email exists or not
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
    const token = await getToken(email, newUser);

    // We want to return following to the user
    // 1. Actual user created
    // 2. Token
    const userToreturn = {...newUser.toJSON(), token};
    delete userToreturn.password;
    return res.status(200).json(userToreturn);
});


router.post('/login' , async (req,res) => {
    // this function will handle the logic to login user

    // get details from req.body
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(401).json({err : "Invalid userName or Password"});
    }

    // check if a user exist with that email exists or not
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(401).json({err : "Invalid userName or Password"});
    }
    // verify if password provided by user is correct or not
    const isPasswordValid = await bcrypt.compare(password , user.password);
    if(!isPasswordValid){
        return res.status(401).json({err : "Invalid userName or Password"});
    }

    // Create a JWT token and return it to the user
    const token = await getToken(email, user);

    // We want to return following to the user
    // 1. Actual user created
    // 2. Token
    const userToreturn = {...user.toJSON(), token};
    delete userToreturn.password;
    return res.status(200).json(userToreturn);
});

module.exports = router;