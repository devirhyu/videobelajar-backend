const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Akses ditolak. Token tidak ditemukan.'
        });
    }

    const secretKey = process.env.JWT_SECRET || 'super_secret_key_videobelajar';

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 'fail',
                message: 'Token tidak valid atau sudah kadaluarsa.'
            });
        }

        req.user = decoded;
        next(); 
    });
};

module.exports = verifyToken;