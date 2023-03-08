export class GetRequestError extends Error {
  public message: string;

  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(`[ERROR] ${message}, [STATUS CODE] ${statusCode}`);
    this.name = 'GetRequestError';
    this.message = message;
    this.statusCode = statusCode;
  }
}
