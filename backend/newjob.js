const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  poc: {
    type: String,
  },
  description: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  email: {
    type: String,
  },
  wages: {
    type: String,
  },
  vacancies: {
    type: String,
  },
  startdate: {
    type: String,
  },
  enddate: {
    type: String,
  },
  area: {
    type: String,
  },
  location: {
    type: String,
  },
  tags: {
    type: [String],
  },
  username:{
    type:String,
  },
  createdAt:{
    type : String,
  },
});

const Jobs = mongoose.model('Jobs', jobsSchema);

module.exports = Jobs;