const express = require('express');

const app=express();

app.get('/' , (req,res) =>{
    res.send("I am working");
})

app.listen( 8000 , ()=>{
    console.log("Server Running on port 8000");
})