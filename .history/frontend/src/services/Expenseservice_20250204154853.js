// Frontend: services/expenseService.js
import api from "../utils/api";

const expenseService = {
  // Get all expenses
  getExpenses: () => api.get("/expenses"),

  // Add new expense
  addExpense: (expenseData) => {
    // Ensure date is in proper format if not provided
    const data = {
      ...expenseData,
      date: expenseData.date || new Date(),
    };
    return api.post("/api/expenses", data);
  },

  // Update existing expense
  updateExpense: (id, data) => api.put(`/api/expenses/${id}`, data),

  // Delete expense
  deleteExpense: (id) => api.delete(`/api/expenses/${id}`),

  // Get spending insights
  getSpendingInsights: () => api.get("/api/expenses/insights"),
};

export default expenseService;
