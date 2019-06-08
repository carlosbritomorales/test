const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = Schema({
  title: String,
  userid: String,
  category: String,
  rating: Number,
  description: String,
  status: {
  type: Boolean,
  default: false
  }
});

module.exports = mongoose.model('requests', RequestSchema);
