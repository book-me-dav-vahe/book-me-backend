import prisma from "../prisma";
import { RouterBuilder } from "../services/routerBuilder";

const locationsRouter = new RouterBuilder("/locations");

locationsRouter.post("/").handler(async (req) => {
  const newLocation = await prisma.locations.create({ data: req.body });

  return newLocation;
});

locationsRouter.get("/").handler(() => {
  return prisma.locations.findMany();
});

locationsRouter.put("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  const updatedLocation = await prisma.locations.update({
    where: { id },
    data: req.body,
  });

  return updatedLocation;
});

locationsRouter.delete("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  await prisma.locations.delete({ where: { id } });
});

export default locationsRouter;
