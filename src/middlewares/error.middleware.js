import AppException from '../core/exceptions/AppException.js';
import ValidationException from '../core/exceptions/ValidationException.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors
    });
  }

  if (err instanceof AppException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
};