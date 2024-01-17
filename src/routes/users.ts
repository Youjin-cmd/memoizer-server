import express from "express";

import { getAllQuestions } from "../controllers/questions.controller";

const router = express.Router();

router.get("/:userid/questions", getAllQuestions);

export default router;
