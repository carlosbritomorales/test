const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = Schema({
  title: String,
  answer: String,
  question: String,
  questuserid: String,
  userid: String,
  serviceid: String,
  providername: String,
  requestdate: String,
  category: String,
  rating: String,
  description: String,
  status: {
  type: Boolean,
  default: false
  }
});

module.exports = mongoose.model('question', QuestionSchema);
