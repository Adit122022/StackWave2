// routes/tagRoutes.js
const express = require('express');
const questionModel = require('../models/questionModel');

const router = express.Router();


//  sare tags k liye
router.get('/',  async (req, res) => {
    try {
      // Use distinct to get unique tags
      const tags = await questionModel.distinct("tags");
      res.status(200).json({ tags });
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ message: "Server Error while fetching tags" });
    }
  });

// // In your questionRoutes.js
router.get('/:tagName', async (req, res) => {
  const { tagName } = req.params;
  //  console.log( " Tag NAME received  --->  " , tagName)
  try {
    const questions = await questionModel.find({ tags: tagName }).populate("authorId");
    console.log(questions)
    res.status(200).json({ questions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions." });
  }
});




module.exports = router;
