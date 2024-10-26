import prisma from "../prisma";
import { RouterBuilder } from "../services/routerBuilder";

const providerServicesRouter = new RouterBuilder("/provider-services");

providerServicesRouter.post("/").handler(async (req) => {
  const newProviderService = await prisma.providerServices.create({
    data: req.body,
    include: { provider: true, service: true },
  });

  return newProviderService;
});

providerServicesRouter.get("/").handler(() => {
  return prisma.providerServices.findMany({
    where: { isDeleted: false },
    include: { provider: true, service: true },
  });
});

providerServicesRouter.put("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  const updatedProviderService = await prisma.providerServices.update({
    where: { id },
    data: req.body,
    include: { provider: true, service: true },
  });

  return updatedProviderService;
});

providerServicesRouter.delete("/:id").handler(async (req) => {
  const id = Number(req.params.id);
  await prisma.providerServices.update({
    where: { id },
    data: { isDeleted: true },
  });
});

export default providerServicesRouter;
