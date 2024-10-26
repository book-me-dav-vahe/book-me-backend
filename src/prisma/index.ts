import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    categories: {
      isDeleted: true,
    },
    locations: {
      isDeleted: true,
    },
    providers: {
      isDeleted: true,
    },
    providerServices: {
      isDeleted: true,
    },
    services: {
      isDeleted: true,
    },
    subCategories: {
      isDeleted: true,
    },
    user: {
      password: true,
      isDeleted: true,
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
