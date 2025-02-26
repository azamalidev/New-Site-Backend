const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  status: { type: String, required: true , default:'AddToCart' },
  paidChallan: { type: String, required: false },
  uploadedAt: { type: Date, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedAt: { type: Date, default: Date.now } ,
});

module.exports = mongoose.model('AddToCart', orderSchema);
