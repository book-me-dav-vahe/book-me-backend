import express from "express";
import { PORT } from "./constants";
import auth from "./src/routers/auth";
import categories from "./src/routers/categories";
import locations from "./src/routers/locations";
import providers from "./src/routers/providers";
import providerServices from "./src/routers/providerServices";
import services from "./src/routers/services";
import subCategories from "./src/routers/subCategories";
import users from "./src/routers/users";

import corsMiddleware from "./src/middleware/corsMiddleware";

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.use(auth.router);
app.use(categories.router);
app.use(locations.router);
app.use(providers.router);
app.use(providerServices.router);
app.use(services.router);
app.use(subCategories.router);
app.use(users.router);

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
