const jwt = require('jsonwebtoken');

const requireRole = (roles) => {
    return (req, res, next) => {
        // 1. Get token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        try {
            // 2. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
            req.user = decoded;

            // 3. Check role
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access forbidden: Insufficient privileges' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
};

module.exports = requireRole;
