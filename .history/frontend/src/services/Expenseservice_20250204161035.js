import api from "../utils/api";

const expenseService = {
  // Fetch all expenses
  getExpenses: () => api.get("/expenses"),

  // Add new expense
  addExpense: (expenseData) => {
    console.log("Payload being sent:", expenseData); // Debugging
    return api.post("/expenses", expenseData);
  },

  // Update an existing expense
  updateExpense: (id, updatedData) => api.put(`/expenses/${id}`, updatedData),

  // Delete an expense
  deleteExpense: (id) => api.delete(`/expenses/${id}`),

  // Get insights
  getSpendingInsights: () => api.get("/expenses/insights"),
};

export default expenseService;
