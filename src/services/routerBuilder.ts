import express, { RequestHandler, Router } from "express";
import errorHandler from "../utils/errorHandler";

import type { RouteParameters } from "express-serve-static-core";

class Route<R extends string, P = RouteParameters<R>> {
  private middlewares: Array<RequestHandler<P>> = [];
  private url: string;

  constructor(
    private method: "post" | "get" | "put" | "delete",
    private baseUrl: string,
    private path: R,
    private router: Router
  ) {
    this.url = `${this.baseUrl}${this.path}`;
  }

  middleware(middleware: RequestHandler<P>) {
    this.middlewares.push(middleware);
    return this;
  }

  handler(cb: RequestHandler<P>) {
    const callbackWithErrorHandler: RequestHandler<P> = async (
      req,
      res,
      next
    ) => {
      try {
        const result = await cb(req, res, next);

        res.json(result);
      } catch (err) {
        errorHandler<R, P>(err, req, res);
      }
    };

    return this.router[this.method](
      this.url,
      ...this.middlewares,
      callbackWithErrorHandler
    );
  }
}

export class RouterBuilder {
  router: Router;
  constructor(private url: string) {
    this.router = express.Router();
  }

  post<R extends string, P = RouteParameters<R>>(path: R) {
    return new Route<R, P>("post", this.url, path, this.router);
  }

  get<R extends string, P = RouteParameters<R>>(path: R) {
    return new Route<R, P>("get", this.url, path, this.router);
  }

  put<R extends string, P = RouteParameters<R>>(path: R) {
    return new Route<R, P>("put", this.url, path, this.router);
  }

  delete<R extends string, P = RouteParameters<R>>(path: R) {
    return new Route<R, P>("delete", this.url, path, this.router);
  }
}
