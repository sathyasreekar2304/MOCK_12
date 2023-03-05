require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const User=require('../models/user.js');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Posts=require('../models/posts.js');
const Campaign=require("../models/campaign.js");


const CLIENT_URL = "http://localhost:8080/home";

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:process.env.SEND_GRID
      }
    })
  );
  

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
  else{
    res.json({error:"Not Authenticated"});
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:8080");
});

router.get("/google",
passport.authenticate('google', { scope: ["profile","email"] })
);

router.get(
  "/google/secrets",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


router.get("/facebook", passport.authenticate('facebook',{
    authType: 'rerequest',
    scope: ['user_friends', 'email', 'public_profile'],
}));

router.get(
  "/facebook/secrets",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.post("/register", function(req, res){
  console.log('aaaaaaaaaa');
    User.findOne({username:req.body.username},function(err,foundUser){
      if(!err){
        if(foundUser){
            if(foundUser.registered){
                return res.json({error:"User Already exists"})
            }
          foundUser.setPassword(req.body.password, function(err, user){
            if(err){
              return res.json({error:"Error"})
            }
            user.registered=true;
            user.save();
            req.login(user, function(err){
              if (err) {
                console.log(err);
              } else {
                // passport.authenticate("local")(req, res, function(){
                //     transporter.sendMail({
                //         to: req.body.username,
                //         from: 'sathya.dinavahi@gmail.com',
                //         subject: 'Successfully Registered',
                //         html: `
                //           <p>You are registered successfully!!!</p>
                //         `
                //       });
                  res.json({message:"Successfully Registered"});
              }
            });
          });
        }
        else{
          console.log('register');
          User.register({username: 'sathya.dinavahi@gmail.com',registered:true,name:req.body.name,role:req.body.role,age:req.body.age,gender:req.body.gender,skills:req.body.skills,cause:req.body.cause}, 'vvv', function(err, user){
            if (err) {
              console.log(err);
              res.json({message:'error'})
            } else {
              passport.authenticate("local")(req, res, function(){
                // transporter.sendMail({
                //   to: req.body.username,
                //   from: 'sathya.dinavahi@gmail.com',
                //   subject: 'Successfully Registered',
                //   html: `
                //     <p>You are registered successfully!!</p>
                //   `
                // });
                res.json({message:"Successfully Registered"});
              });
            }
          });
        }
      }
    });
    console.log('aaaijij');
    
    });
    
router.post("/login", function(req, res){
    console.log('hello');
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    console.log('iuuuuuuuuuu');
    req.login(user, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('bye');
        passport.authenticate("local")(req, res, function(){
          console.log(req.user)
          res.json({message:"logged in success"})
        });
      }
    });
    });

  router.post('/campaign/register',(req,res,next)=>{

    User.findOne( {username : req.body.campaignHead}, function( err, foundUser ){
      const campaign=new Campaign({
        campaignHead:foundUser,
        organization:req.body.organization,
        campaignId:req.body.campaignId,
        cause:req.body.cause,
        description:req.body.description,
        imageUrl:req.body.imageUrl
      });
      campaign.save().then(()=>{
        User.findByIdAndUpdate(req.user.id,{
          $push:{campaigns:campaign}
      },{
          new:true
      }).exec((err,result)=>{
          if(err){
              return res.status(422).json({error:err})
          }else{

            transporter.sendMail({
              to: req.body.campaignHead,
              from: 'sathya.dinavahi@gmail.com',
              subject: 'Successfully Registered',
              html: `
                <p>You are assigned as a head of ${req.body.organization}!!</p>
              `
            });

              res.json({message:"Added Data Successfully"});
          }
      })
      });
    });
  })

  router.post('/post/create',(req,res,next)=>{
    const title=req.body.title;
    const description=req.body.description;
    const campaignId=req.body.campaignId;
    const user=req.user.username;
    const imageUrl=req.body.imageUrl;
    const post=new Posts({ title,campaignId,user,description,imageUrl});
    User.findById(req.user.id, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.scores = foundUser.scores+1;
          foundUser.save();
        }
      }
    });
    post.save().then((postu)=>{
      User.findByIdAndUpdate(req.user.id,{
        $push:{posts:postu}
    },{
        new:true
    }).exec((err,result)=>{
      if(err){
        return res.status(422).json({error:err})
    }else{
        res.json({message:"Added data successfully!!"})
    }
    }
    );
  });
  });

  router.get('/user/posts',(req,res,next)=>{
      User.findById(req.user.id).populate('posts')
      .then(posts => {
        res.json({data:posts});
      })
      .catch(err => console.log(err));
  });

  router.get('/posts',(req,res,next)=>{
    Posts.find().then(posts=>{
      res.json({data:posts});
    });
  });

  router.get('/campaign/:campaignId',(req,res,next)=>{
    const campI=req.params.campaignId;
    Campaign.find({campId:campI})
    .then(campaign => {
      return res.json({campaigns:campaign});
  });
});

  router.get('/campaign',(req,res,next)=>{
    Campaign.find().then(camp=>{
      return res.json({campaigns:camp});
    })
  })

  router.post('/post/:postId',(req,res,next)=>{
    const postId=req.params.postId;
    Posts.findById(postId)
    .then(post => {
      post.currentCount=post.currentCount+1;
      post.save();
      return res.json({message:"Successfully added"});
    })
  })

  router.post('/campaign/:campId',(req,res,next)=>{
    const campI=req.params.campId;
    User.findById(req.user.id, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.scores = foundUser.scores+1;
          foundUser.save();
        }
      }
    });
    Campaign.find({campaignId:campI})
    .then(campaign => {
      campaign.currentCount=campaign.currentCount+1;
     campaign.save();
      User.findByIdAndUpdate(req.user.id,{
        $push:{campaigns:campaign}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json({message:"Successfully added"});
        }
    })
      return res.json({message:"Successfully added"});
    })
  });

  router.get('/scores',(req,res,next)=>{
    User.find().then((users)=>{
      return res.json({result:users});
    })
  });


module.exports = router;