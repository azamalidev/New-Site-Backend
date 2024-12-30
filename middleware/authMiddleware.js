const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({status:false, statusCode:401, message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded payload (e.g., user info) to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ status:false, statusCode:401, message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
