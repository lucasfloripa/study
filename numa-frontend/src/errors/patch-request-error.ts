export class PatchRequestError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(`[ERROR] ${message}, [STATUS CODE] ${statusCode}`);
    this.name = 'PatchRequestError';
    this.message = message;
    this.statusCode = statusCode;
  }
}
