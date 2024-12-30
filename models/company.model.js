const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  companyName: { type: String, default: '' },
  companyLogo: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Company', orderSchema);
