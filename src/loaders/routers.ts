import { Express } from "express";
import indexRouter from "../routes/index";

async function routerLoader(app: Express) {
  app.use("/", indexRouter);
}

export default routerLoader;
