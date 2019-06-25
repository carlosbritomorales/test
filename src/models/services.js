const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = Schema({
  title: String,
  latitude: Number,
  longitude: Number,
  userid: String,
  username: String,
  category: String,
  rating: Number,
  description: String,
  test: String,
  status: {
  type: Boolean,
  default: false
  }
});

module.exports = mongoose.model('services', ServiceSchema);
