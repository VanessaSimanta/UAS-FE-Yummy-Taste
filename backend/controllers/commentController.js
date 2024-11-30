const Comment = require('../models/commentsModel');

// Endpoint untuk mendapatkan semua komentar
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getComments();
        return res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        return res.status(500).json({ message: 'Error fetching comments' });
    }
};

// Endpoint untuk menambahkan komentar
const createComment = async (req, res) => {
    const { name, comment } = req.body;
    try {
        const newComment = await Comment.create(name, comment);
        return res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        console.error('Error creating comment:', error.message);
        return res.status(500).json({ message: 'Error creating comment' });
    }
};

module.exports = { getAllComments, createComment };
