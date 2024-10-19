import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../../constants";

export function generateAccessToken(userId: number) {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: "21d",
  });
}
