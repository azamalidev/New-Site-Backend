const mongoose = require('mongoose');
const marksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  testType: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  obtainMarks: { type: Number, required: true },
  percentage: { type: Number, required: true },
});

module.exports = mongoose.model('Mark', marksSchema);
