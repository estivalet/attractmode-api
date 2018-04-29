var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RomlistSchema = new Schema(
  {
    name: {type: String},
  }
);


//Export model
module.exports = mongoose.model('Romlist', RomlistSchema);