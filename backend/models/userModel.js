const client = require('../config/db');

// Cek apakah email sudah ada
const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  
  try {
    const res = await client.query(query, values);
    return res.rows[0]; 
  } catch (err) {
    throw new Error('Error finding user: ' + err.message);
  }
};

// Membuat user baru
const bcrypt = require('bcrypt');

// Membuat user baru dengan hashing password
const createUser = async (name, email, phoneNumber, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); 
  const query = 'INSERT INTO users (name, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [name, email, phoneNumber, hashedPassword];
  
  try {
    const res = await client.query(query, values);
    return res.rows[0];  
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};


module.exports = { findUserByEmail, createUser };
