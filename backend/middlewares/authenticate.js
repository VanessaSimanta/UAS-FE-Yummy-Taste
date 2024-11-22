const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }
  
    // Jika token mengandung prefix 'Bearer', hapus prefix tersebut
    const jwtToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired. Please login again.' });
        }
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  };
  

module.exports = authenticate;
