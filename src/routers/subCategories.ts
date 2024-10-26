import prisma from "../prisma";
import { RouterBuilder } from "../services/routerBuilder";

const subCategoriesRouter = new RouterBuilder("/sub-categories");

subCategoriesRouter.post("/").handler(async (req) => {
  const newSubCategory = await prisma.subCategories.create({
    data: req.body,
  });

  return newSubCategory;
});

subCategoriesRouter.get("/").handler(() => {
  return prisma.subCategories.findMany({
    where: { isDeleted: false },
    include: { services: true },
  });
});

subCategoriesRouter.put("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  const updatedSubCategory = await prisma.subCategories.update({
    where: { id },
    data: req.body,
  });

  return updatedSubCategory;
});

subCategoriesRouter.delete("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  await prisma.subCategories.update({
    where: { id },
    data: { isDeleted: true },
  });
});

export default subCategoriesRouter;
