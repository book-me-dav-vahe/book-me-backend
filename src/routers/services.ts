import prisma from "../prisma";
import { RouterBuilder } from "../services/routerBuilder";

const servicesRouter = new RouterBuilder("/services");

servicesRouter.post("/").handler(async (req) => {
  const newService = await prisma.services.create({
    data: req.body,
    include: { subCategory: true, subServices: true },
  });

  return newService;
});

servicesRouter.get("/").handler(() => {
  return prisma.services.findMany({
    where: { isDeleted: false },
    include: { subCategory: true, subServices: true },
  });
});

servicesRouter.get("/:id").handler(async (req) => {
  const id = Number(req.params.id);

  const services = await prisma.services.findUnique({
    where: { id, isDeleted: false },
    include: {
      subCategory: true,
      providers: true,
      parent: true,
      subServices: true,
    },
  });

  return services;
});

servicesRouter.put("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  const updatedService = await prisma.services.update({
    where: { id },
    data: req.body,
    include: { subCategory: true, subServices: true },
  });

  return updatedService;
});

servicesRouter.delete("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  await prisma.services.update({ where: { id }, data: { isDeleted: true } });
});

export default servicesRouter;
