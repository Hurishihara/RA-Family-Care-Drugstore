import { parse } from 'cookie'
import { verifyJwtToken } from '../utils/jwt.js';
import CustomError from '../utils/error.js';
import { StatusCodes } from 'http-status-codes';

const authValidation = (req, res, next) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) {
        const hasRefreshToken = req.headers.cookie?.includes('refreshToken');
        if (hasRefreshToken) {
            return next(new CustomError('Unauthorized', 'Access token expired or invalid. Please refresh token.', StatusCodes.UNAUTHORIZED));
        }
        return next(new CustomError('Unauthorized', 'No authentication provided. Please log in to continue', StatusCodes.UNAUTHORIZED));
    }
    try {
        const decoded = verifyJwtToken(accessToken, 'accessToken');
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err.message === 'Invalid or expired token') {
            return next(new CustomError('Unauthorized', 'Access token expired or invalid. Please log in again.', StatusCodes.UNAUTHORIZED));
        }
        return next(new CustomError('Unauthorized', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
    }

}

const refreshTokenValidation = (req, res, next) => {
    const refreshToken = req.headers.cookie ? parse(req.headers.cookie) : {};
    if (!refreshToken.refreshToken) {
        return next(new CustomError('Unauthorized', 'No authentication provided. Please log in to continue', StatusCodes.UNAUTHORIZED));
    }
    try {
        const decodedRefreshToken = verifyJwtToken(refreshToken.refreshToken, 'refreshToken');
        req.user = decodedRefreshToken;
        next();
    }
    catch (err) {
        console.error('Error verifying refresh token:', err);
        return next(new CustomError('Unauthorized', 'Invalid or expired refresh token. Please log in again.', StatusCodes.UNAUTHORIZED));
    }
}

export { authValidation, refreshTokenValidation }