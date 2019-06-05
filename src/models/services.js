const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = Schema({
  title: String,
  userid: String,
  username: String,
  category: String,
  rating: Number,
  description: String,
  status: {
  type: Boolean,
  default: false
  }
});

module.exports = mongoose.model('services', ServiceSchema);
