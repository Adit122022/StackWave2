const answerModel = require('../models/answerModel');
const questionModel = require('../models/questionModel');

module.exports.addAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;

    const answer = await answerModel.create({
      questionId,
      content,
      authorId: req.user._id,
    });
    await questionModel.findByIdAndUpdate(
        questionId,
        { $push: { answers: answer._id } },
        { new: true }
      );
 
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { content } = req.body;

    const answer = await answerModel.findById(answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    if (!answer.authorId.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized' });

    answer.content = content;
    await answer.save();
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;

    const answer = await answerModel.findById(answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    if (!answer.authorId.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized' });

    await answer.deleteOne();
    res.status(200).json({ message: 'Answer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.voteAnswer = async (req, res) => {
    try {
      const { answerId ,type } = req.params;// 'up' or 'down'
      const userId = req.user._id;
    // console.log(type);
      if (!['up', 'down'].includes(type)) {
        return res.status(400).json({ message: 'Invalid vote type' });
      }
  
      const answer = await answerModel.findById(answerId);
      if (!answer) return res.status(404).json({ message: 'Answer not found' });
  
      const existingVote = answer.votedUsers.find(
        (v) => v.userId.toString() === userId.toString()
      );
  
      if (existingVote) {
        if (existingVote.voteType === type) {
          return res.status(400).json({ message: `You've already ${type}voted this answer.` });
        }
  
        // Change vote
        answer.votes += type === 'up' ? 1 : -1;
        existingVote.voteType = type;
      } else {
        // New vote
        answer.votes += type === 'up' ? 1 : -1;
        answer.votedUsers.push({ userId, type});
      }
  
      await answer.save();
      res.status(200).json({ message: 'Vote recorded', votes: answer.votes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  



