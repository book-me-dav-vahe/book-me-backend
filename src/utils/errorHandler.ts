import { IS_DEVELOPMENT } from "../../constants";
import type { Request, Response } from "express";
import type { RouteParameters } from "express-serve-static-core";

export default function errorHandler<R extends string, P = RouteParameters<R>>(
  err: any,
  _req: Request<P>,
  res: Response
) {
  const error = {
    statusCode: 500,
    message: "An unexpected error occurred",
    ...err,
  };

  // TODO: configure winston to have logs in production
  // winston.error(
  //   JSON.stringify({
  //     status: error.statusCode || 500,
  //     message: err.message,
  //     url: req.originalUrl,
  //     method: req.method,
  //     ip: req.ip,
  //     userId: req.user?.id || "N/A",
  //     response: err.response?.data || "N/A",
  //     stack: err.stack,
  //     body: req.body,
  //   })
  // );

  res.status(error.statusCode).json(
    IS_DEVELOPMENT
      ? error
      : {
          statusCode: error.statusCode,
          message: error.message,
        }
  );
}
