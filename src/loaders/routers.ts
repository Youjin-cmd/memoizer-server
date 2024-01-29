import { Express } from "express";
import indexRouter from "../routes/index";
import authRouter from "../routes/auth";
import usersRouter from "../routes/users";

async function routerLoader(app: Express) {
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
}

export default routerLoader;
