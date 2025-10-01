// import Course from '../models/Course.js';
// import User from '../models/User.js';
const Course = require('../models/Course.js');
const User = require('../models/User.js');
// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Mentor
const createCourse = async (req, res) => {
  const { title, description, content } = req.body;

  const course = new Course({
    title,
    description,
    content,
    mentor: req.user._id,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
  const courses = await Course.find({}).populate('mentor', 'name');
  res.json(courses);
};

// @desc    Get a single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id).populate('mentor', 'name');
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Mark a course as complete
// @route   POST /api/courses/:id/complete
// @access  Private
const completeCourse = async (req, res) => {
    const user = await User.findById(req.user._id);
    const courseId = req.params.id;

    if (user && !user.courses_completed.includes(courseId)) {
        user.courses_completed.push(courseId);
        user.points += 10; // Award 10 points for completing a course
        await user.save();
        res.json({ message: 'Course marked as complete!' });
    } else {
        res.status(400).json({ message: 'Course already completed or user not found.' });
    }
};

module.exports= { createCourse, getAllCourses, getCourseById, completeCourse };
