import { Express } from "express";
import indexRouter from "../routes/index";
import authRouter from "../routes/auth";

async function routerLoader(app: Express) {
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
}

export default routerLoader;
