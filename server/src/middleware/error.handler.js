import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/error.js';

const errorHandler = (err, req, res, next) => {
    let title = err.name || 'Internal Server Error';
    let description = err.message || 'Something went wrong';
    let statusCode = res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    if (err instanceof CustomError) {
        title = err.title;
        description = err.description;
        statusCode = err.statusCode;
    }
    res.status(statusCode).json({
        title,
        description,
    })
}

export default errorHandler;