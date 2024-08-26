export class CustomError extends Error {
  statusCode: number;
  errors: object;

  constructor(message: string, statusCode: number, errors: object = {}) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
  }

  static serverError(message: string = 'An error occurred', errors: object = {}) {
    return new CustomError(message, 500, errors);
  }

  static badRequest(message: string = 'Bad request', errors: object = {}) {
    return new CustomError(message, 400, errors);
  }
}
