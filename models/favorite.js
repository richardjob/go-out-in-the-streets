const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
    outlets:[mongoose.Types.ObjectId]
})

module.exports = mongoose.model('Favorite',favoriteSchema)