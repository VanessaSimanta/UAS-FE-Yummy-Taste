const client = require('../config/db');

//SIGN UP
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

//LOGIN
//cek email dan password sama dengan di db
const checkUser = async (email, password) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const res = await client.query(query, values);
    if (res.rows.length === 0) {
      return null; // User tidak ditemukan
    }

    const user = res.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password); // Cocokkan password

    if (!isPasswordValid) {
      return null; // Password tidak cocok
    }

    return user; // Return user jika valid
  } catch (err) {
    throw new Error('Error during user check: ' + err.message);
  }
};




module.exports = { findUserByEmail, createUser, checkUser };
