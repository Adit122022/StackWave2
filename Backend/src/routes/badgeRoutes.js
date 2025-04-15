// routes/badgeRoutes.js
const express = require('express');
const badgeModel = require('../models/badgeModel');

const router = express.Router();
router.get('/', async (req, res) => {
    try {
      const badges = await badgeModel.find({});
      res.status(200).json({ badges });
    } catch (error) {
      console.error("Error fetching badges:", error);
      res.status(500).json({ message: "Server error while fetching badges" });
    }
  });

module.exports = router;
