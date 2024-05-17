const express = require('express');
const passport = require('passport');
const { ExtractJwt , JwtStrategy } = require('passport-jwt');
const mongoose = require('mongoose');

const app=express();

// to connect to MongoDb
mongoose.connect( 'mongodb+srv://Priyanshu:best159@player@cluster0.nl4ozpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' ,
    {
        useNewUrlParser : true,
        useUnifiedtopology : true,
    }
).then( (x) =>{
    console.log("Connected to Mongo");
}).catch( (err) =>{
    console.log("error occured while connecting to Mongo");
    console.log(err);
});

// passport jwt setup
// jwt_payload : {identifier : userId}
let opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisisSupposedToBeSecret";
passport.use( new JwtStrategy(opts, function(jwt_payload , done){
    User.findOne({ _id: jwt_payload.identifier} , function(err,user){
        if(err){
            done(err , false);
        }
        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    });
}));


app.get('/' , (req,res) =>{
    res.send("I am working");
})

app.listen( 8000 , ()=>{
    console.log("Server Running on port 8000");
})