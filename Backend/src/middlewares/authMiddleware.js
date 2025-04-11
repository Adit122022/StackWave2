const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const protect = async(req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

 // Example of fetching user from database (if you're doing this)
const user = await User.findById(decoded.id).select('+role');
req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { protect };
