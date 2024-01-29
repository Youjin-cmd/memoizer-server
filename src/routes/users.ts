import express from "express";

import {
  getAllQuestions,
  createQuestion,
} from "../controllers/questions.controller";

const router = express.Router();

router.get("/:userid/questions", getAllQuestions);
router.post("/:userid/question", createQuestion);

export default router;
