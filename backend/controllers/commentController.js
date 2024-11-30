const Comment = require('../models/commentsModel');

const commentController = {
    addComment: async (req, res) => {
        try {
            const { name, comment } = req.body;

            if (!name || !comment) {
                return res.status(400).json({ error: 'Name and comment are required.' });
            }

            const newComment = await Comment.create(name, comment);
            res.status(201).json({ message: 'Comment added successfully', comment: newComment });
        } catch (err) {
            res.status(500).json({ error: 'Error adding comment', details: err.message });
        }
    },
};

module.exports = commentController;

