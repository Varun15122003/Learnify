// import Post from '../models/Post.js';
const Post = require('../models/Post.js');

// @desc    Create a new post in a course discussion
// @route   POST /api/posts/course/:courseId
// @access  Private
const createPost = async (req, res) => {
  const { text } = req.body;
  const { courseId } = req.params;

  const post = new Post({
    text,
    course: courseId,
    user: req.user._id,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
};

// @desc    Get all posts for a course
// @route   GET /api/posts/course/:courseId
// @access  Public
const getPostsForCourse = async (req, res) => {
  const posts = await Post.find({ course: req.params.courseId }).populate('user', 'name role');
  res.json(posts);
};

module.exports ={ createPost, getPostsForCourse };
