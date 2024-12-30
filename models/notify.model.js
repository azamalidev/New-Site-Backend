const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'  },
  discription: { type: String, required: true  },
  notificationType: { type: String, required: true  },
  read : { type: Boolean, required: true, default:false },
  readByAdmin : { type: Boolean, required: true, default:false },
  notificationAt: { type: Date, default: Date.now } ,
});

module.exports = mongoose.model('Notify', orderSchema);
