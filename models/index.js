var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ebook-server');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Page;
var Schema = mongoose.Schema;
 
var pageSchema = new Schema({
  name:  String,
  title: String,
  url_name: String,
  owner_id:   String,
  body:   String,
  date: { type: Date, default: Date.now },
  editing: Boolean
});
  
Page = mongoose.model('Page', pageSchema);
 
module.exports = {"Page": Page};