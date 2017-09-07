// load the things we need
var mongoose = require('mongoose');

var snSchema = mongoose.Schema({
  type: String,
  data: {}
});

module.exports = mongoose.model('SN', snSchema);
