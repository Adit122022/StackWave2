const questionModel = require('../models/questionModel');

// Create a Post
module.exports.Create = async (req, res) => {
    try {
        const { title, body, tags } = req.body;

        if (!title || !body) {
            return res.status(400).json({ message: 'Title and body are required' });
        }
        const formattedTags = Array.isArray(tags)
        ? tags.map(tag => tag.toLowerCase())
        : [];
        const newQuestion = await questionModel.create({
            title,
            body,
            tags:formattedTags ,
            authorId: req.user.id
        });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAllQuestion =  async (req, res) => {
    try {
        const questions = await questionModel.find().populate('authorId', 'name'); 
        // console.log(questions);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getOneQuestion = async (req, res) => {
    try {
        const question = await questionModel.findById(req.params.id)
            .populate('authorId', 'name')
            .populate({
                path: 'answers',
                populate: {
                    path: 'authorId',
                    select: 'name'
                }
            });

        if (!question) return res.status(404).json({ message: 'Question not found' });

        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.Update = async (req, res) => {
    try {
        const { title, body, tags } = req.body;
        const questionId = req.params.id;

        // Find question
        const question = await questionModel.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Check if logged-in user is the author
        if (question.authorId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only update your own question' });
        }

        // Update question fields
        question.title = title || question.title;
        question.body = body || question.body;
        question.tags = tags || question.tags;

        await question.save();
        res.json({ message: 'Question updated successfully', question });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.Delete = async (req, res) => {
    try {
        const question = await questionModel.findById(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        if (question.authorId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await question.deleteOne();
        res.json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


