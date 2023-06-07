const mongoose = require('mongoose');

const responsesSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  name: {
    type: String,
  },
  phonenumber: {
    default: 123456789,
    type: Number,
  },
  previoushires: {
    default: 0,
    type: String,
  },
  status: {
    default: 'pending',
    type: String,
  },
  jobid: {
    type: String,
  },
  username: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

const Responses = mongoose.model('Responses', responsesSchema);

module.exports = Responses;