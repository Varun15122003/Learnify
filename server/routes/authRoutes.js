const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfilePicture, // Naya function import karein
} = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js'); // Upload middleware import karein

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// Profile picture upload ke liye naya route
router.put(
  '/profile/picture', 
  protect, // Sunishchit karein ki user logged in hai
  upload.single('profilePicture'), // Multer middleware file ko handle karega
  updateUserProfilePicture
);

module.exports = router;

