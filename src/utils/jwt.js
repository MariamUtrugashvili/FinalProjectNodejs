const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function generateToken(user) {
    const payload = {
        id: user.id,
        role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken,
};
