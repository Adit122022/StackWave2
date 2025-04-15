const badgeModel = require("../models/badgeModel");
const userModel = require("../models/userModel");


const awardBadgeToUser = async (userId, badgeName) => {
  // Find badge by name
  const badge = await badgeModel.findOne({ name: badgeName });
  if (!badge) {
    console.warn('Badge not found:', badgeName);
    return;
  }
  
  const user = await userModel.findById(userId);
  if (!user) {
    console.warn('User not found:', userId);
    return;
  }
  
  // Avoid duplicate awards
  if (user.badges.includes(badge._id)) {
    return;
  }

  user.badges.push(badge._id);
  await user.save();
  return badge;
};

module.exports = {
  awardBadgeToUser,
};
