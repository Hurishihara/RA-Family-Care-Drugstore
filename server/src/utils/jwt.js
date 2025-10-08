import 'dotenv/config';
import jwt from 'jsonwebtoken';

const refreshTokenSecret = process.env.REFRESH_JWT_SECRET;
const accessTokenSecret = process.env.ACCESS_JWT_SECRET;

const generateJwtToken = (userId, role) => {
    const payload = { userId, role }

    const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
    const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' });
    return {
        refreshToken,
        accessToken
    };
}

const verifyJwtToken = (token, type) => {
    try {
        if (type === 'accessToken') {
            return jwt.verify(token, accessTokenSecret);
        }
        else {
            return jwt.verify(token, refreshTokenSecret);
        }
    }
    catch (err) {
        console.error('JWT verification error:', err);
        throw new Error('Invalid or expired token');
    }
}

export { generateJwtToken, verifyJwtToken }