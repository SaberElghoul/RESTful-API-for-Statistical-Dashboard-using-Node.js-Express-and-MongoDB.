var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var configSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  tableName: {
    type: String,
    required: true
  }, 
  
  database: {type: Schema.Types.ObjectId, ref: 'database'},

  fieldOne: {
    type: String,
    required: true
  },
  fieldTow: {
    type: String,
    required: true
  }
  
  
});

module.exports = mongoose.model('config', configSchema);
