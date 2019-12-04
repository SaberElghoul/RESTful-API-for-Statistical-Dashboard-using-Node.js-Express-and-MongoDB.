var mongoose = require('mongoose');

const valid =require('validator');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  
  firstname: {
    type: String,
    // unique: true,
    required: true
  },
  lastname: {
    type: String,
    // unique: true,
    required: true
  },
  email:{
    type: String ,
    trim : true,
    validate:{

       validator:(v) => {
           return valid.isEmail(v)
       },
    
       message :`{VALUE} is not an email`
    }
    },
  password: String,
  
  
 
});

module.exports = mongoose.model('user', UserSchema);
