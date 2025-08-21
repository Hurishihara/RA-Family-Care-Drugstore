import { parse } from 'cookie'
import { verifyJwtToken } from '../utils/jwt.js';

const authValidation = (req, res, next) => {
    const cookieHeader = req.headers.cookie ? parse(req.headers.cookie) : {};

    if (!cookieHeader.authToken) {
        res.status(401).json({ error: 'Unauthorized' });
        return
    }
    try {
        const decoded = verifyJwtToken(cookieHeader.authToken);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }

}

export default authValidation;