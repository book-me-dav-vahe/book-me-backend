import prisma from "../prisma";
import { RouterBuilder } from "../services/routerBuilder";

const categoriesRouter = new RouterBuilder("/categories");

categoriesRouter.post("/").handler((req) => {
  return prisma.categories.create({ data: req.body });
});

categoriesRouter.get("/").handler(() => {
  return prisma.categories.findMany({
    where: { isDeleted: false },
    include: { subCategories: true },
  });
});

categoriesRouter.put("/:id").handler((req) => {
  const id = Number(req.params.id);
  return prisma.categories.update({
    where: { id },
    data: req.body,
  });
});

categoriesRouter.delete("/:id").handler((req) => {
  const id = Number(req.params.id);
  return prisma.categories.update({ where: { id }, data: { isDeleted: true } });
});

export default categoriesRouter;
