import express from "express";
import prisma from "../prisma";

const providersRouter = express.Router();

providersRouter.post("/", async (req, res) => {
  try {
    const newProvider = await prisma.providers.create({
      data: req.body,
      include: { services: true, location: true },
    });

    res.status(200).send(newProvider);
  } catch (error) {
    res.status(500).send({ error, message: "Failed to create new provider" });
  }
});

providersRouter.get("/", async (_req, res) => {
  const providers = await prisma.providers.findMany({
    include: { services: true, location: true },
  });
  res.status(200).send(providers);
});

providersRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updatedProvider = await prisma.providers.update({
    where: { id },
    data: req.body,
    include: { services: true, location: true },
  });

  res.status(200).send(updatedProvider);
});

providersRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.providers.delete({ where: { id } });

  res.status(200).send();
});

export default providersRouter;
