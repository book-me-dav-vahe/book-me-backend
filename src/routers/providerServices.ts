import express from "express";
import prisma from "../prisma";

const providerServicesRouter = express.Router();

providerServicesRouter.post("/", async (req, res) => {
  try {
    const newProviderService = await prisma.providerServices.create({
      data: req.body,
      include: { provider: true, service: true },
    });

    res.status(200).send(newProviderService);
  } catch (error) {
    res
      .status(500)
      .send({ error, message: "Failed to create new providerservice" });
  }
});

providerServicesRouter.get("/", async (_req, res) => {
  const providerServices = await prisma.providerServices.findMany({
    include: { provider: true, service: true },
  });
  res.status(200).send(providerServices);
});

providerServicesRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updatedProviderService = await prisma.providerServices.update({
    where: { id },
    data: req.body,
    include: { provider: true, service: true },
  });

  res.status(200).send(updatedProviderService);
});

providerServicesRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.providerServices.delete({ where: { id } });

  res.status(200).send();
});

export default providerServicesRouter;
