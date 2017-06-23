// load the things we need
var mongoose = require('mongoose');

var snSchema = mongoose.Schema({
  table: String,
  data: {}
});

module.exports = mongoose.model('SN', snSchema);
