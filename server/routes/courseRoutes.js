const express = require('express');
const {
  createCourse,
  getAllCourses,
  getCourseById,
  completeCourse,
} = require('../controllers/courseController.js');
const { protect, mentor } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/')
  .post(protect, mentor, createCourse)
  .get(getAllCourses);

router.route('/:id')
  .get(getCourseById);
  
router.route('/:id/complete')
    .post(protect, completeCourse);

module.exports = router;

