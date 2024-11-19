const client = require('../config/db'); 

// GET user data by email
const getUserByEmail = async (email) => {
    try {
        // Query untuk mendapatkan data user berdasarkan email
        const query = `SELECT id, name, email, date_of_birth, phone_number FROM users WHERE email = $1`;
        const result = await client.query(query, [email]);

        return result.rows[0]; 
    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        throw error;
    }
};

module.exports = {
    getUserByEmail,
};
