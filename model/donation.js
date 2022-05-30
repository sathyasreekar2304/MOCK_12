const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    image:{
        type:String,
        required:true
    },
    condition:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Donation', donationSchema);