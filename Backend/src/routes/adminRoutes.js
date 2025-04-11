const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const User = require('../models/userModel');
const { getUsers } = require('../controllers/adminController');

const router = express.Router();

//  All Users (Admin Only)
router.get('/users', protect, authorizeRoles('admin'),getUsers);

module.exports = router;
