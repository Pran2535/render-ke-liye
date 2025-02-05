import api from "../utils/api";

const expenseService = {
  // Fetch all expenses
  getExpenses: () => api.get("/expenses"),

  // Add new expense; description is optional.
  addExpense: (expenseData) => {
    // Create a copy of the expense data.
    const payload = { ...expenseData };
    // Remove description if not provided (or empty).
    if (!payload.description) {
      delete payload.description;
    }
    console.log("Payload being sent:", payload);
    return api.post("/expenses", payload);
  },

  // Update an existing expense
  updateExpense: (id, updatedData) => api.put(`/expenses/${id}`, updatedData),

  // Delete an expense
  deleteExpense: (id) => api.delete(`/expenses/${id}`),

  // Get insights
  getSpendingInsights: () => api.get("/expenses/insights"),
};

export default expenseService;
