const express = require('express');
const {
  createPost,
  getPostsForCourse,
} = require('../controllers/postController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/course/:courseId')
  .post(protect, createPost)
  .get(getPostsForCourse);

module.exports = router;

