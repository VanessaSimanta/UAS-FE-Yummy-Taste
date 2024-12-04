const client = require('../config/db');
const moment = require('moment');
const bcrypt = require('bcrypt');

// get user data by email
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

//Update data user
const updateUserDataByEmail = async (email, name, phoneNumber, formattedDateOfBirth) => {
    try {
        // Validate date format
        if (!moment(formattedDateOfBirth, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
        }

        // Membuat query untuk update data user berdasarkan email
        const query = `
            UPDATE users
            SET name = COALESCE($1, name),
                phone_number = COALESCE($2, phone_number),
                date_of_birth = COALESCE($3, date_of_birth)
            WHERE email = $4
            RETURNING id, name, email, date_of_birth, phone_number;
        `;
        const result = await client.query(query, [name, phoneNumber, formattedDateOfBirth, email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error in updateUserDataByEmail:', error);
        throw error;
    }
};

//Update user password
const updateUserPassByEmail = async (email, password) => {
    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `UPDATE users set password = COALESCE ($1, password)
    WHERE email = $2
    RETURNING id, email, password`;
    const result = await client.query(query, [hashedPassword, email]);
        return result.rows[0];
}

// Memasukkan token untuk di blacklist (logout)
const addTokenToBlacklist = async (token, userId) => {
    try {
        const result = await client.query(
            'INSERT INTO blacklist_tokens (token, user_id) VALUES ($1, $2)', 
            [token, userId]
        );
        return result;
    } catch (error) {
        console.error('Error adding token to blacklist:', error);
        throw error;
    }
};


// Cek token diblack list atau tidak
const isTokenBlacklisted = async (token) => {
    try {
        const query = `SELECT 1 FROM blacklist_tokens WHERE token = $1`;
        const result = await client.query(query, [token]);
        return result.rowCount > 0; 
    } catch (error) {
        console.error('Error in isTokenBlacklisted:', error);
        throw error;
    }
};


// Delete user
const deleteUserByEmail = async (email) => {
    try {
        // Query untuk delete data user
        const query = `DELETE FROM users WHERE email = $1 RETURNING *`;
        const result = await client.query(query, [email]);

        return result.rows[0]; 
    } catch (error) {
        console.error('Error in delete user', error);
        throw error;
    }
}


module.exports = {
    getUserByEmail, updateUserDataByEmail, updateUserPassByEmail, addTokenToBlacklist, isTokenBlacklisted, deleteUserByEmail
};
