const client = require('../config/db');
const bcrypt = require('bcrypt');
const moment = require('moment');

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
const createUser = async (name, email, phoneNumber, dateOfBirth, password) => {
  //hashing password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // DOB Convertion
  const formattedDateOfBirth = moment(dateOfBirth).format('YYYY-MM-DD');

  // Validate date format 
  if (!moment(formattedDateOfBirth, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
  }
  // Insert to DB
  const query = 'INSERT INTO users (name, email, phone_number, date_of_birth, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [name, email, phoneNumber, formattedDateOfBirth, hashedPassword];
  
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
      return null; 
    }

    return user; 
  } catch (err) {
    throw new Error('Error during user check: ' + err.message);
  }
};

module.exports = { findUserByEmail, createUser, checkUser };
