const client = require('../config/db');

const Comment = {
    create: async (name, comment) => {
        const query = 'INSERT INTO comments (name, comment) VALUES ($1, $2) RETURNING *';
        const values = [name, comment];
        const result = await client.query(query, values);
        return result.rows[0];
    },
};

module.exports = Comment;
