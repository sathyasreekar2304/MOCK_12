require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User=require('./model/user.js');
const Donation=require('./model/donation.js');
const session = require('express-session');
const passport = require("passport");
const app = express();
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const donation = require("./model/donation.js");

app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());
  
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/register',(req,res,next)=>{
    User.register(
        new User({
          username: req.body.username,
          role:req.body.role,
        }),
        req.body.password,
        (err, user) => {
          console.log(err);
          console.log(user);
  
          if (err) {
            res.send(err);
          }
          passport.authenticate("local", {
            session: false
          })(req, res, () => {
            res.status(200).send("Successfully created new user");
          });
        }
      );
  
    
});
app.get("/",(req,res,next)=>{
    res.json({"mode":hello});
})
app.post("/login", function(req, res){
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      role:req.body.role,
    });
    req.login(user, function(err){
      if (err) {
        console.log(err);
        res.json({message:'Please check your credentials'});
      } else {
        passport.authenticate("local")(req, res, function(){
            console.log("Successfully logged in");
            console.log(req.user.id);
            return res.json({message:'logged in successfully'})
        });
      }
    });
  
  });

app.get("/logout", function(req, res){
    req.logout(function(err) {
        if (err) {
            return res.json({message:err});
        }
        res.json({message:'logged out'});
      });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.post('/donate',(req,res,next)=>{
    if(!req.isAuthenticated() || req.user.role!='donor'){
        return res.json({message:"Not Possible"})
    }
   else if(req.user.role!='donor'){
    return res.json({message:"Must be donor"})
   }
   else{
    const image = req.body.image;
    const condition = +req.body.condition;
    const name=req.body.name;
    console.log(image,condition);
    const donation = new Donation({
        image:image,
        condition:condition,
        name:name,
        user:req.user.id,
    });
    donation
      .save()
      .then(result => {
        return User.findById(req.user.id);
      })
      .then(user => {
        creator = user;
        user.donationGiven.push(donation);
        return user.save();
      })
      .then(result => {
        res.status(201).json({
          message: 'Donation Done SuccessFully',
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        res.status(500).json({message:err})
      });
    }
})

app.get('/post',(req,res,next)=>{
    if(req.isAuthenticated() && req.user.role=="donee"){
        donation.find().then(donations=>{
            res.status(200).json({
                donations:donations
            })
        })
    }
    else{
        res.json(500).message({message:"Not a Donor"});
    }
})

const port = 3000;

mongoose
  .connect(
      'mongodb+srv://mock12:mock12@mycluster.gsscj.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(port);
  })
  .catch(err => 
    console.log("Not found"));
