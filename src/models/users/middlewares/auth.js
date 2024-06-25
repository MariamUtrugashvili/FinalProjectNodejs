const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401);
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(403);
    }
}

function authorizeRole(...roles) {
    return (req, res, next) => {
        console.log('User Role:', req.user.role);
        if (!roles.includes(req.user.role)) {
            console.log('Forbidden: Insufficient role');
            return res.sendStatus(403);
        }
        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRole,
};
