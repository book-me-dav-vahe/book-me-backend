import express from "express";
import prisma from "../prisma";

const subCategoriesRouter = express.Router();

subCategoriesRouter.post("/", async (req, res) => {
  try {
    const newSubCategory = await prisma.subCategories.create({
      data: req.body,
    });

    res.status(200).send(newSubCategory);
  } catch (error) {
    res
      .status(500)
      .send({ error, message: "Failed to create new subCategory" });
  }
});

subCategoriesRouter.get("/", async (_req, res) => {
  const subCategories = await prisma.subCategories.findMany({
    include: { services: true },
  });
  res.status(200).send(subCategories);
});

subCategoriesRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updatedSubCategory = await prisma.subCategories.update({
    where: { id },
    data: req.body,
  });

  res.status(200).send(updatedSubCategory);
});

subCategoriesRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.subCategories.delete({ where: { id } });

  res.status(200).send();
});

export default subCategoriesRouter;
