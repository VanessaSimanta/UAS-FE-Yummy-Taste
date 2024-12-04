const { Comment, Message } = require('../models/commentsModel');

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

// Endpoint untuk menndapatkan message
const getAllMessage = async (req, res) => {
    try {
        const messages = await Message.getMessage();  
        return res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching message:', error.message);
        return res.status(500).json({ message: 'Error fetching message' });
    }
};

// Endpoint untuk menambahkan message
const createMessage = async (req, res) => {
    const { email, message } = req.body;
    try {
        const newMessage = await Message.createMessage(email, message);  
        return res.status(201).json({ message: 'Message created successfully', message: newMessage });
    } catch (error) {
        console.error('Error creating message:', error.message);
        return res.status(500).json({ message: 'Error creating message' });
    }
};


module.exports = { getAllComments, createComment, getAllMessage, createMessage };
