const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
      },
  password: {
    type: String,
  },
  role:{
      type:String,
  },
  donationGiven: [
    {
      type: Schema.Types.ObjectId,
      ref: 'donation'
    }
  ],
  donationTaken:[
      {
          type:Schema.Types.ObjectId,
          ref:'donation'
      }
  ]
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
