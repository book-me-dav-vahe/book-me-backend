import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { JWT_ACCESS_SECRET } from "../../constants";

import type { NextFunction, Request, Response } from "express";

export default async function userMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return next();
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, JWT_ACCESS_SECRET) as { userId: number };

    req.user = await prisma.user.findFirstOrThrow({
      where: { id: payload.userId },
    });
  } catch (_err) {}

  return next();
}
