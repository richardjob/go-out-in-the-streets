var express = require('express');
var Usersrouter = express.Router();
const passport = require ('passport')
const User = require('../models/user')
const authenticate = require('../authenticate')


/* GET users listing. */
Usersrouter.get('/',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
  User.find({})
  .then((users)=>{
    res.setStatus = 200
    res.setHeader('Content-Type','application/json')
    res.json(users)
  })
});

Usersrouter.post('/signup',(req,res,next)=>{
  User.register(new User({username:req.body.username}), req.body.password, (err,user)=>{
    if(err){
      res.setStatus =500
      res.setHeader('Content-Type','application/json')
      res.json({err:err})
    }
    else{
      passport.authenticate('local')(req,res,()=>{
      res.setHeader('Content-Type','application/json')
      res.setStatus = 200;
      res.json({ success:true, status:'Registration Success' })
      })
    }
  })
})

Usersrouter.post('/login',passport.authenticate('local'),(req,res)=>{

  let token = authenticate.getToken({_id: req.user._id})

  res.setHeader('Content-Type','application/json')
  res.setStatus = 200;
  res.json({ success:true, token:token, status:'You are Succesfully logged in' })  
})

Usersrouter.get('/logout',(req,res,next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id')
    res.redirect('/')
  }
  else{
    var err = new Error('Your are not Logged in')
    err.status = 403
    return next(err)
  }
})

module.exports = Usersrouter;
