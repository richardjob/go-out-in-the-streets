const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    user:{
        type:String,
        required:true,
    },
    review:{
        type:String,
        required:true,
    }
})

const outletSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
        default:'',
    },
    address:{
        type:String,
        required:true,
        unique:true,
    },
    mapsLink:{
        type:String,
        required:false,
    },
    timing:{
        type:String,
        required:true,
    },
    cost:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    tags:[String],
    reviews: [reviewSchema]
},{
    timestamps:true
});

module.exports = mongoose.model('Outlet',outletSchema);