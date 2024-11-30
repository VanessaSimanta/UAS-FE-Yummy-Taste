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
const createUser = async (name, email, phoneNumber, dateOfBirth, password, role) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Format tanggal lahir
  const formattedDateOfBirth = moment(dateOfBirth).format('YYYY-MM-DD');

  // Query SQL untuk menyisipkan user baru
  const query = 'INSERT INTO users (name, email, phone_number, date_of_birth, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [name, email, phoneNumber, formattedDateOfBirth, hashedPassword, role];

  try {
    const res = await client.query(query, values);
    return res.rows[0];  // Mengembalikan user yang baru dibuat
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
      return null; 
    }

    // roles dari user
    const user = res.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password); 

    if (!isPasswordValid) {
      return null; 
    }

    return user;
  } catch (err) {
    throw new Error('Error during user check: ' + err.message);
  }
};


module.exports = { findUserByEmail, createUser, checkUser };
