import express from "express";
import prisma from "../prisma";

const categoriesRouter = express.Router();

categoriesRouter.post("/", async (req, res) => {
  try {
    const newCategory = await prisma.categories.create({ data: req.body });

    res.status(200).send(newCategory);
  } catch (error) {
    res.status(500).send({ error, message: "Failed to create new category" });
  }
});

categoriesRouter.get("/", async (_req, res) => {
  const categories = await prisma.categories.findMany({
    include: { subCategories: true },
  });
  res.status(200).send(categories);
});

categoriesRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updatedCategory = await prisma.categories.update({
    where: { id },
    data: req.body,
  });

  res.status(200).send(updatedCategory);
});

categoriesRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.categories.delete({ where: { id } });

  res.status(200).send();
});

export default categoriesRouter;
