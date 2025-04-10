import AppException from './AppException.js';

class ValidationException extends AppException {
  constructor(errors) {
    super('Validation Failed', 400);
    this.errors = errors;
  }
}

export default ValidationException;