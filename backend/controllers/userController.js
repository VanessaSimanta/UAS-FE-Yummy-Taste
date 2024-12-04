const { body, validationResult } = require('express-validator');
const { findUserByEmail, createUser, checkUser, updateSubscription } = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signup = [
  // Middleware validasi
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().withMessage('Name is required'),
  body('dateOfBirth').notEmpty().withMessage('Date of birth is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('subscription').optional().isIn(['Basic', 'Pro', 'Premium']).withMessage('Invalid subscription type'), 

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phoneNumber, dateOfBirth, password, subscription } = req.body;

    try {
      // Cek apakah email sudah ada di database
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already taken' });
      }

      // Tentukan role berdasarkan email (admin atau user)
      const role = email === 'admin@admin12.com' && password === 'sayaadmin12' ? 'admin' : 'user';

      // Set subscription default jika tidak ada
      const userSubscription = subscription || 'Basic'; // Default subscription "Basic" jika tidak ada

      // Buat user baru
      const newUser = await createUser(name, email, phoneNumber, dateOfBirth, password, role, userSubscription);  

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error.message);
      return res.status(500).json({ message: 'Error creating user' });
    }
  },
];

const login = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

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

      // Cek apakah email dan password adalah untuk admin
      if (email === 'admin@admin12.com' && password === 'sayaadmin12') {
        existingUser.role = 'admin'; 
      }

      // Tentukan subscription plan dari data user
      const subscriptionPlan = existingUser.subscription || 'Basic'; 

      // Generate JWT token dengan tambahan informasi langganan
      const token = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role,
          subscription: subscriptionPlan 
        }, 
        process.env.JWT_SECRET,                            
        { expiresIn: '5h' }                                
      );

      return res.status(200).json({
        message: 'Login Successful',
        token, 
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          subscription: subscriptionPlan 
        },
      });
    } catch (err) {
      console.error('Error during login:', err.message);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  },
];

// Update status subscription user
const updateUserSubscription = async (req, res) => {
  const { email, subscription } = req.body;

  try {
      if (!email || !subscription) {
          return res.status(400).json({ message: 'Email and subscription are required' });
      }

      // Periksa apakah pengguna ada
      const user = await findUserByEmail(email);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Perbarui subscription pengguna
      await updateSubscription(email, subscription);

      res.status(200).json({ message: `Subscription updated to ${subscription}` });
  } catch (error) {
      console.error('Error updating subscription:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = { signup, login, updateUserSubscription };

