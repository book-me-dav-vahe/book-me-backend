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
    where: { isDeleted: false },
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

usersRouter.get("/:id").handler((req) => {
  return prisma.user.findFirstOrThrow({
    where: { isDeleted: false, id: Number(req.params.id) },
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
  await prisma.user.update({ where: { id }, data: { isDeleted: true } });
});

export default usersRouter;
