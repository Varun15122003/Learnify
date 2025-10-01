const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: true },
}, {
    timestamps: true
});

const postSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true },
  replies: [replySchema],
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

