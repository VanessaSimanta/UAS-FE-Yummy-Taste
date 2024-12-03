const client = require('../config/db');

const Comment = {
    // Menambahkan komentar
    create: async (name, comment) => {
        const query = 'INSERT INTO comments (name, comment) VALUES ($1, $2) RETURNING *';
        const values = [name, comment];
        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (err) {
            throw new Error('Error creating comment: ' + err.message);
        }
    },

    // Mendapatkan semua komentar
    getComments: async () => {
        const query = 'SELECT * FROM comments';
        try {
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw new Error('Error fetching comments: ' + err.message);
        }
    },
};

const Message = {
    // Menambahkan message
    createMessage: async (email, message) => {
        const query = 'INSERT INTO message (email, message) VALUES ($1, $2) RETURNING *';
        const values = [email, message];
        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (err) {
            throw new Error('Error creating message: ' + err.message);
        }
    },

    // Mendapatkan semua message
    getMessage: async () => {
        const query = 'SELECT * FROM message';
        try {
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            throw new Error('Error fetching message: ' + err.message);
        }
    },
};

// Correct export statement
module.exports = { Comment, Message };
