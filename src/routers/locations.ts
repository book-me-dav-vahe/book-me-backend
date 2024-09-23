import express from "express";
import prisma from "../prisma";

const locationsRouter = express.Router();

locationsRouter.post("/", async (req, res) => {
  try {
    const newLocation = await prisma.locations.create({ data: req.body });

    res.status(200).send(newLocation);
  } catch (error) {
    res.status(500).send({ error, message: "Failed to create new location" });
  }
});

locationsRouter.get("/", async (_req, res) => {
  const locations = await prisma.locations.findMany();
  res.status(200).send(locations);
});

locationsRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updatedLocation = await prisma.locations.update({
    where: { id },
    data: req.body,
  });

  res.status(200).send(updatedLocation);
});

locationsRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.locations.delete({ where: { id } });

  res.status(200).send();
});

export default locationsRouter;
