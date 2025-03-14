import prisma from "../prisma";
import { RouterBuilder } from "../services/routerBuilder";

const subCategoriesRouter = new RouterBuilder("/sub-categories");

subCategoriesRouter.post("/").handler(async (req) => {
  const newSubCategory = await prisma.subCategories.create({
    data: req.body,
  });

  return newSubCategory;
});

subCategoriesRouter.get("/").handler((req) => {
  const categoryId = req.query.categoryId;
  const where =
    typeof categoryId === "string" ? { categoryId: parseInt(categoryId) } : {};

  return prisma.subCategories.findMany({
    where: { isDeleted: false, ...where },
    include: { services: true },
  });
});

subCategoriesRouter.get("/:id").handler((req) => {
  return prisma.subCategories.findFirstOrThrow({
    where: { isDeleted: false, id: Number(req.params.id) },
    include: { services: true, category: true },
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
