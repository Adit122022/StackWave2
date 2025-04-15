// routes/tagRoutes.js
const express = require('express');
const questionModel = require('../models/questionModel');

const router = express.Router();

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

module.exports = router;
