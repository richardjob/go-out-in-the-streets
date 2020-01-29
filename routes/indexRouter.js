var express = require('express');
var indexRouter = express.Router();
const bodyParser = require('body-parser')
const Outlets = require('../models/outlet');
const authenticate = require('../authenticate')

indexRouter.use(bodyParser.json())

indexRouter.route('/')
.get((req,res,next)=>{
  Outlets.find(req.query)
  .then((outlets)=>{
    res.setHeader('Content-Type','application/json')
    res.setStatus = 200
    res.json(outlets)
  })
  .catch((err)=>{
    console.log(err);
  })
})

.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
  Outlets.create(req.body)
  .then((outlets)=>{
    res.setHeader('Content-Type','application/json')
    res.setStatus = 200
    res.json(outlets)
  })
  .catch((err)=>{
    console.log(err);
    res.end('Cannot POST WARNING: Duplicate Outlet found')
  })
})

.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
  res.end('Cannot Update WARNING: Check your action')
})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
  Outlets.deleteMany({})
  .then((resp)=>{
    res.setHeader('Content-Type','application/json')
    res.setStatus = 200
    res.json(resp)
  })
  .catch((err)=>{
    console.log(err);
  })
})



indexRouter.route('/:outletID')
.get((req,res,next)=>{
  Outlets.find({_id:req.params.outletID})
  .then((outlet)=>{
    res.setHeader('Content-Type','application/json')
    res.setStatus = 200
    res.json(outlet)
  })
  .catch((err)=>{
    console.log(err);
  })
})

.post((req,res,next)=>{
  res.end('Cannot POST WARNING: Check your action')
})

.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

  Outlets.findByIdAndUpdate(req.params.outletID)
  .then((outlet)=>{
    if(outlet!=null){
      if(req.body.address){
        outlet.address = req.body.address
      }
      if(req.body.mapsLink){
        outlet.mapsLink = req.body.mapsLink
      }
      if(req.body.timing){
        outlet.timing = req.body.timing
      }
      if(req.body.cost){
        outlet.cost = req.body.cost
      }
      if(req.body.rating){
        outlet.rating = req.body.rating
      }
      if(req.body.description){
        outlet.description = req.body.description
      }
      outlet.save()
    }else{
      res.setHeader('Content-Type','application/json')
      res.setStatus = 404
      res.json({err:'Outlet not Found'})
    }
  res.setHeader('Content-Type','application/json')
  res.setStatus = 200
  res.json(outlet)
  })
  .catch((err)=>{
    console.log(err);
  })
 
})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
  Outlets.deleteOne({_id:req.params.outletID})
  .then((resp)=>{
    res.setHeader('Content-Type','application/json')
    res.setStatus = 200
    res.json(resp)
  })
  .catch((err)=>{
    console.log(err);
  })
})


module.exports = indexRouter;
