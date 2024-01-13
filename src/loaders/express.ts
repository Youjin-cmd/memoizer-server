import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import CONFIG from "../constants/config";

const corsOptions = {
  origin: CONFIG.CLIENT_URL,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

async function expressLoader(app: Express) {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
}

export default expressLoader;
