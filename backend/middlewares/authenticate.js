const jwt = require('jsonwebtoken');
const client = require('../config/db');
const { isTokenBlacklisted } = require('../models/accountModel');  

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    // Menghapus Bearer dari token
    const jwtToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        // Verifikasi token JWT
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

        // Periksa apakah token ada dalam blacklist menggunakan model
        const isBlacklisted = await isTokenBlacklisted(jwtToken);
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted. Please login again.' });
        }

        //kalau tidak di blacklist maka mendapat autentikasi
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired. Please login again.' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
