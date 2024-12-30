const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicleType: { type: String, required: false },
  policyType: { type: String, required: false },
  previousPolicytype: { type: String, required: false },
  previousYearclame: { type: String, required: false },
  policyExpirydate: { type: String, required: false },
  policyMorethan90: { type: Boolean, required: false },
  registrationNumber: { type: String, required: false },
  make: { type: String, required: false },
  vehicleModel: { type: String, required: false },
  GVC: { type: String, required: false },
  registrationDate: { type: String, required: false },
  registerNumber: { type: String, required: false },
  manufactureDate: { type: String, required: false },
  commented:{ type: Boolean, required: false },
  fuelType: { type: String, required: false },
  vehicleChassis: { type: String, required: false },
  vehicleEngineNumber: { type: String, required: false },
  attachPreviouspolicy: { type: String, required: false },
  ownerDetail: {
    ownerName: { type: String, required: false },
    ownerPhone: { type: String, required: false },
    ownerAddress: { type: String, required: false },
    ownerEmail: { type: String, required: false },
  },
  registrationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentVarified: { type: Boolean, required: false,default:false },
  payemtVarifyDate:{ type: Date, required: false },
  cycleCompleteDate: { type: Date, required: false },
  requestSent: { type: Boolean, required: false, default: true },
  quotationMade: { type: Boolean, required: false, default: false },
  paymentDone: { type: Boolean, required: false, default: false },
  policyUploaded: { type: Boolean, required: false, default: false },

  requestUpdated: { type: Boolean, required: false, default: false },
  quotationDetail: [
    {
      companyLogo: { type: String, required: false },
      companyName: { type: String, required: false },
      coverAmount: { type: String, required: false },
      paymentLink: { type: String, required: false },
      cashlessCharge: { type: String, required: false },
      activityPoints: { type: String, required: false },
    },
  ],
  paymentExpireAfter: { type: String, required: false },
  vehicleDetailURL: { type: String, required: false, default: '' },
  previousPolicyURL: { type: String, required: false, default: '' },
  policyUrl: { type: String, required: false, default: '' },
  policyExpire:{ type: String, required: false },

  paymentDetail: {
    userName: { type: String, required: false },
    activityPointsReceived: { type: Number, required: false, default: 0 },
    coverAmount: { type: String, required: false },
    companyLogo: { type: String, required: false },
    status:{ type: String, required: false, default: 'Pending' },
  },
  paymentDate: { type: Date, required: false },

});

module.exports = mongoose.model('Request', requestSchema);
