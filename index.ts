import express from "express";
import { PORT } from "./constants";
import categoriesRouter from "./src/routers/categories";
import locationsRouter from "./src/routers/locations";
import providersRouter from "./src/routers/providers";
import providerServicesRouter from "./src/routers/providerServices";
import servicesRouter from "./src/routers/services";
import subCategoriesRouter from "./src/routers/subCategories";
import usersRouter from "./src/routers/users";

const app = express();
app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/locations", locationsRouter);
app.use("/providers", providersRouter);
app.use("/provider-services", providerServicesRouter);
app.use("/services", servicesRouter);
app.use("/sub-categories", subCategoriesRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
