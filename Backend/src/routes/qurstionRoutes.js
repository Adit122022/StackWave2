const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const {  Create, getAllQuestion, getOneQuestion, Delete, Update } = require('../controllers/questionController');
// ✅ Create  questions
router.post('/', protect, Create);
// ✅ Get all questions
router.get('/',getAllQuestion);
// ✅ Get 1 question
router.get('/:id',getOneQuestion);
// ✅ Update a question (Only Author can update)
router.patch('/update/:id', protect, Update);
// ✅ Delete a question (Only Author can delete)
router.delete('/delete/:id', protect, Delete);

module.exports = router;
