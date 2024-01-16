import express from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { check, login, logout } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/check", verifyToken, check);

export default router;
