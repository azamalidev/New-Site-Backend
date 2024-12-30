const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  discription: { type: String, required: true  },
  active : { type: Boolean, required: true, default:true  },
  commentAt: { type: Date, default: Date.now } ,
});

module.exports = mongoose.model('Comment', orderSchema);
