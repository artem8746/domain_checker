export class CustomError extends Error {
  statusCode: number;
  errors: any;

  constructor(message: string, statusCode: number, errors: any = {}) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
  }

  static serverError(message: string = 'An error occurred', errors: any = {}) {
    return new CustomError(message, 500, errors);
  }

  static badRequest(message: string = 'Bad request', errors: any = {}) {
    return new CustomError(message, 400, errors);
  }
}
