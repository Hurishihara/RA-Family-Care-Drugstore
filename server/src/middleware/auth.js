import { parse } from 'cookie'
import { verifyJwtToken } from '../utils/jwt.js';
import CustomError from '../utils/error.js';
import { StatusCodes } from 'http-status-codes';

const authValidation = (req, res, next) => {
    const cookieHeader = req.headers.cookie ? parse(req.headers.cookie) : {};

    if (!cookieHeader.authToken) {
        return next(new CustomError('Unauthorized', 'No authentication provided. Please log in to continue', StatusCodes.UNAUTHORIZED));
    }
    try {
        const decoded = verifyJwtToken(cookieHeader.authToken);
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err.message === 'Invalid or expired token') {
            return next(new CustomError('Unauthorized', 'Session expired or invalid. Please log in again.', StatusCodes.UNAUTHORIZED));
        }
        return next(new CustomError('Unauthorized', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
    }

}

export default authValidation;