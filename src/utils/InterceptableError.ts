export class InterceptableError extends Error {
  constructor(public statusCode: number, public message = "") {
    super();
  }
}
