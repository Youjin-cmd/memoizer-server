import { Express } from "express";
import expressLoader from "./express";
import routerLoader from "./routers";
import errorHandlerLoader from "./errorHandler";
import mongooseLoader from "./mongoose";

async function appLoader(app: Express) {
  await mongooseLoader();
  await expressLoader(app);
  await routerLoader(app);
  await errorHandlerLoader(app);
}

export default appLoader;
