import { Express, Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { Error } from "../types/type";

async function errorHandlerLoader(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });

  app.use((err: Error, req: Request, res: Response) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.json({ message: err.message });
  });
}

export default errorHandlerLoader;
