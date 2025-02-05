// Frontend: services/expenseService.js
import api from "../utils/api";

const expenseService = {
  // Get all expenses
  getExpenses: () => api.get("/expenses"),

  // Add new expense
  addExpense: (data) => api.post("/expenses", data),

  // Update existing expense
  updateExpense: (id, data) => api.put(`/expenses/${id}`, data),

  // Delete expense
  deleteExpense: (id) => api.delete(`/expenses/${id}`),

  // Get spending insights
  getSpendingInsights: () => api.get("/expenses/insights"),
};

export default expenseService;
