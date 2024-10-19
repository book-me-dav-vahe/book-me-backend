import prisma from "../prisma";
import { RouterBuilder } from "../services/routerBuilder";

const usersRouter = new RouterBuilder("/users");

usersRouter.post("/").handler(async (req) => {
  const newUser = await prisma.user.create({
    data: req.body,
    include: {
      providers: {
        include: {
          location: true,
          services: true,
        },
      },
    },
  });

  return newUser;
});

usersRouter.get("/").handler(() => {
  return prisma.user.findMany({
    include: {
      providers: {
        include: {
          location: true,
          services: true,
        },
      },
    },
  });
});

usersRouter.put("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  const updatedUser = await prisma.user.update({
    where: { id },
    data: req.body,
    include: {
      providers: {
        include: {
          location: true,
          services: true,
        },
      },
    },
  });

  return updatedUser;
});

usersRouter.delete("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
});

export default usersRouter;
