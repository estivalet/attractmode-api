var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SystemSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {type: String},
    folder: {type: String},
    romExtension: {type: Array},
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);



//Export model
module.exports = mongoose.model('System', SystemSchema);