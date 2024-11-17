const { body, validationResult } = require('express-validator');
const { findUserByEmail, createUser, checkUser } = require('../models/userModel');

const signup = [
  // Middleware validasi
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().withMessage('Name is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),

  // Fungsi utama
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phoneNumber, password } = req.body;

    try {
      // Cek apakah email sudah ada di database
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already taken' });
      }

      // Buat user baru
      const newUser = await createUser(name, email, phoneNumber, password);
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error.message);
      return res.status(500).json({ message: 'Error creating user' });
    }
  },
];

const login = [
  // Middleware validasi
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  // Fungsi utama
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Cek user di database
      const existingUser = await checkUser(email, password);

      if (!existingUser) {
        return res.status(404).json({ message: 'Account not found' });
      }

      return res.status(200).json({ message: 'Login Successful', user: existingUser });
    } catch (err) {
      console.error('Error during login:', err.message);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  },
];


module.exports = { signup, login };

