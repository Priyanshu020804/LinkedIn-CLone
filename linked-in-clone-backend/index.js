const express = require('express');
const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const mongoose = require('mongoose');

const authRoutes = require("./routes/auth");

require("dotenv").config();

const app=express();
app.use(express.json());

// Encode the MongoDB password
const encodedPassword = encodeURIComponent(process.env.MONGO_PASSWORD);

// Connect mongodb to our node app
// mongoose.connect takes two arguments  
// 1: Which Database to connect to   --- > (URL of Mongodb)
// 2: connection options
mongoose.connect(
    // Add your MONGO_PASSWORD in a .env file using npm dotenv
    "mongodb+srv://Priyanshu:" + encodedPassword +"@cluster0.nl4ozpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }
)
.then((x) => {
        console.log("Connected to Mongo!");
}).catch((err) => {
    console.log("Error while connecting to Mongo");
    console.log(err);
});

// passport jwt setup
// jwt_payload : {identifier : userId}
let opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET
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

// app.use will take 2 arguments
// 1. prefix to the route
// 2. routes object
app.use("/auth" , authRoutes);

app.listen( 8000 , ()=>{
    console.log("Server Running on port 8000");
})