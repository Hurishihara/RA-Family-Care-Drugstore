import 'dotenv/config';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = 60 * 60 * 14 // 14 hours

const generateJwtToken = (userId, role) => {
    const payload = { userId, role }
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
}

const verifyJwtToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    }
    catch (err) {
        console.error('JWT verification error:', err);
    }
}

export { generateJwtToken, verifyJwtToken }