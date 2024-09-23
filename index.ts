import express from "express";
import { PORT } from "./constants";
import categoriesRouter from "./src/routers/categories";
import servicesRouter from "./src/routers/services";
import locationsRouter from "./src/routers/locations";
import providersRouter from "./src/routers/providers";

const app = express();
app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/services", servicesRouter);
app.use("/locations", locationsRouter);
app.use("/providers", providersRouter);

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
