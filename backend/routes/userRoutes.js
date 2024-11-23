const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const authenticate = require('../middlewares/authenticate');

// POST request untuk sign-up
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/account', authenticate, accountController.getUser);
router.patch('/updateData', authenticate, accountController.updateUserData);
router.patch('/updatePass', authenticate, accountController.updateUserPass);
router.post('/logout', authenticate, accountController.logout);
router.delete('/deleteUser', authenticate, accountController.deleteAccount);


module.exports = router;
