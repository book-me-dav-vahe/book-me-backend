import express from "express";
import prisma from "../prisma";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  try {
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

    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send({ error, message: "Failed to create new user" });
  }
});

usersRouter.get("/", async (_req, res) => {
  const users = await prisma.user.findMany({
    include: {
      providers: {
        include: {
          location: true,
          services: true,
        },
      },
    },
  });
  res.status(200).send(users);
});

usersRouter.put("/:id", async (req, res) => {
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

  res.status(200).send(updatedUser);
});

usersRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });

  res.status(200).send();
});

export default usersRouter;
