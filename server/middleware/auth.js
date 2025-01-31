

const jwt  = require('jsonwebtoken');
require('dotenv').config();
const PUB_key = process.env.PUB_KEY;
async function auth(req, res, next) {
    const token  = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, PUB_key, { algorithms: ['RS256'] });
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}

module.exports = auth;