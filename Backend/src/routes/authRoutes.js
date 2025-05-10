const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { signup, login, getMe } = require('../controllers/authController');
const { getUsers } = require('../controllers/adminController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/users', getUsers);

module.exports = router;
