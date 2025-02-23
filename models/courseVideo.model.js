const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },

  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  thumbnail: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', videoSchema);
