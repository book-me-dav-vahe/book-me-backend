import { Prisma } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user?: Omit<Prisma.userGetPayload<false>, "password">;
    }
  }
}
