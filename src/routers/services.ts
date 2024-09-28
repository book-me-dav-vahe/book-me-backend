import express from "express";
import prisma from "../prisma";

const servicesRouter = express.Router();

servicesRouter.post("/", async (req, res) => {
  try {
    const newService = await prisma.services.create({
      data: req.body,
      include: { subCategory: true, subServices: true },
    });

    res.status(200).send(newService);
  } catch (error) {
    res.status(500).send({ error, message: "Failed to create new service" });
  }
});

servicesRouter.get("/", async (_req, res) => {
  const services = await prisma.services.findMany({
    include: { subCategory: true, subServices: true },
  });
  res.status(200).send(services);
});

servicesRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const services = await prisma.services.findUnique({
    where: { id },
    include: {
      subCategory: true,
      providers: true,
      parent: true,
      subServices: true,
    },
  });

  res.status(200).send(services);
});

servicesRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updatedService = await prisma.services.update({
    where: { id },
    data: req.body,
    include: { subCategory: true, subServices: true },
  });

  res.status(200).send(updatedService);
});

servicesRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.services.delete({ where: { id } });

  res.status(200).send();
});

export default servicesRouter;
