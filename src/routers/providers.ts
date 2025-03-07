import prisma from "../prisma";
import { RouterBuilder } from "../services/routerBuilder";

const providersRouter = new RouterBuilder("/providers");

providersRouter.post("/").handler(async (req) => {
  const newProvider = await prisma.providers.create({
    data: req.body,
    include: { services: true, location: true },
  });

  return newProvider;
});

providersRouter.get("/").handler(() => {
  return prisma.providers.findMany({
    where: { isDeleted: false },
    include: { services: true, location: true },
  });
});

providersRouter.get("/:id").handler((req) => {
  return prisma.providers.findFirstOrThrow({
    where: { isDeleted: false, id: Number(req.params.id) },
    include: { services: true, location: true },
  });
});

providersRouter.put("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  const updatedProvider = await prisma.providers.update({
    where: { id },
    data: req.body,
    include: { services: true, location: true },
  });

  return updatedProvider;
});

providersRouter.delete("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  await prisma.providers.update({ where: { id }, data: { isDeleted: true } });
});

export default providersRouter;
