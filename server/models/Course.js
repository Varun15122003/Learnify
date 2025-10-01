const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  content: { type: String, required: true }, // Can be Markdown, video link, etc.
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

