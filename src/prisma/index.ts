import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

prisma
  .$connect()
  .then(() => {
    console.log("\x1b[32m%s\x1b[0m", "Connected to the DB!");
  })
  .catch((err) => {
    console.log("\x1b[31m%s\x1b[0m", "Failed to connect to the DB!");
    console.error(err);
  });

export default prisma;
