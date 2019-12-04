var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var databaseSchema = new Schema({
  name: {
    type: String,
    required: true
    
  },
  host: {
    type: String,
    required: true
  
  },
  dbUser: {
    type: String,
    required: true
   
  },
  dbPwd: {
    type: String
    
  },

  user: {type: Schema.Types.ObjectId, ref: 'user'},

  configs: [{type: Schema.Types.ObjectId, ref: 'config'}]

});

module.exports = mongoose.model('database', databaseSchema);
