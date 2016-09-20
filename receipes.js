var mongoose = require('mongoose');   

mongoose.connect('mongodb://104.196.134.223/ivardb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db opened");
});


var Schema = mongoose.Schema;

// create a schema
var receipeSchema = new Schema({
  name: String,
  des:  String,
  tags: String,
  url: String,
  tburl: String,
  cat: String,
  created_at: Date
});

var Receipe = mongoose.model('Receipe', receipeSchema);

module.exports = Receipe;


