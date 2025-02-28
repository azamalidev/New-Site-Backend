const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  discription: { type: String, default: '' },
  defination: { type: String, default: '' },
  prize: { type: Number },
  duration: { type: String },
  courseType: { type: String },
  subject: { type: String, default: '' },
  skill: { type: String, default: '' },
  language: { type: String, default: '' },
  courseTag: { type: [String], required: true },
  outLine: { type: [String], required: true },
  courseImage: { type: String },
  addedAt: { type: Date, default: Date.now },
  launchedDate: { type: String, required: false },
});

module.exports = mongoose.model('Course', courseSchema);
