const User = require('../models/User.js');
const generateToken = require('../utils/generateToken.js');

// ... registerUser aur loginUser functions jaise hain waise hi rahenge ...

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, password, role });
        if (user) {
            res.status(201).json({
                _id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture, points: user.points, courses_completed: user.courses_completed, token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture, points: user.points, courses_completed: user.courses_completed, token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture, points: user.points, courses_completed: user.courses_completed,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// ==> YEH FUNCTION SABSE ZAROORI HAI <==
const updateUserProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (req.file) {
        user.profilePicture = `/uploads/${req.file.filename}`;
        const updatedUser = await user.save();
        res.json({
          message: 'Profile picture updated successfully',
          profilePicture: updatedUser.profilePicture,
        });
      } else {
        res.status(400).json({ message: 'Please upload an image file' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfilePicture };

