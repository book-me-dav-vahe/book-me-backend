import bcrypt from "bcrypt";
import prisma from "../prisma";
import { RouterBuilder } from "../services/routerBuilder";
import userMiddleware from "../middleware/userMiddleware";
import { generateAccessToken } from "../services/jwt";
import { EMAIL_VALIDATION_REGEX } from "../../constants";
import { InterceptableError } from "../utils/InterceptableError";

const authRouter = new RouterBuilder("/auth");

authRouter
  .get("/me")
  .middleware(userMiddleware)
  .handler((req) => req.user);

// NOTE: currently supports only email registration
authRouter.post("/register").handler(async (req) => {
  const { password, email, ...userData } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);

  if (!EMAIL_VALIDATION_REGEX.test(email)) {
    throw new InterceptableError(400);
  }

  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    throw new InterceptableError(409, "User with email already exists!");
  }

  const newUser = await prisma.user.create({
    data: {
      ...userData,
      email,
      authProvider: "email",
      password: hashedPassword,
    },
  });

  const token = generateAccessToken(newUser.id);

  return { token };
});

authRouter.post("/login").handler(async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new InterceptableError(
      400,
      "You must provide an email and a password."
    );
  }

  const user = await prisma.user.findFirst({
    where: { email },
    select: { id: true, password: true },
  });

  if (!user) {
    throw new InterceptableError(403, "User with email does not exist");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new InterceptableError(403, "Invalid password");
  }

  const token = generateAccessToken(user.id);

  return { token };
});

export default authRouter;
