const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: false },
  name: { type: String, required: false },
  profilePhoto: { type: String, required: false },
  QRCode: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  profession: { type: String, required: false },
  TermAndCond: { type: Boolean, required: false },
  verified: { type: Boolean, required: false },
  userType:{ type: String, required: false },
  registerDate: { type: Date, default: Date.now }, 
  referBy:{ type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);
