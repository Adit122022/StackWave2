const answerModel = require('../models/answerModel');
const questionModel = require('../models/questionModel');
const User = require('../models/userModel');

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get basic user info (excluding password)
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Get all questions by the user
    const questions = await questionModel.find({ authorId: userId }).sort({ createdAt: -1 });

    // Get all answers by the user and populate related question titles
    const answers = await answerModel.find({ authorId: userId })
      .populate('questionId', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      ...user.toObject(),
      questions,
      answers,
    });
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    // Uncomment the line below if you want to allow avatar update too
    // user.avatar = req.body.avatar || user.avatar;

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      reputation: user.reputation,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// ✅ Export both functions properly
module.exports = {
  getUserProfile,
  updateUserProfile,
};
