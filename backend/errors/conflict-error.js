const ERROR_CODE = 409;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

module.exports = ConflictError;
