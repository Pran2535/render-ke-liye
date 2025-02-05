import express from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getSpendingInsights,
} from "../controllers/expenseController.js";
import { authenticateToken } from "../middlewares/Middlewareauth.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", createExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.get("/insights", getSpendingInsights);

export default router;
