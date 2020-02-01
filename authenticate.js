const passport = require ('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')


exports.local = passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = function(user) {
    return jwt.sign(user,process.env.secretOrKey)
}

exports.verifyUser = passport.authenticate('jwt',{session:false})
exports.verifyAdmin = (req,res,next)=>{
    if(req.user.admin) next()
    else{
        let err =new Error('Permission Denied')
        next(err)
    }
}

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.secretOrKey //For testing replace with "1234-1234-1234-1234" 

exports.jwtPassport = passport.use(new jwtStrategy(opts, 
    (jwt_payload, done)=>{
        console.log('JWT payload: ',jwt_payload);
        User.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err) return done(err,false)
            else if(user) return done(null,user)
            else return done(null,false)
        })
    }
))