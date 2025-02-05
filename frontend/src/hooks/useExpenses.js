import { useState, useEffect } from "react";
import expenseService from "../services/Expenseservice";

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state before new request
      const response = await expenseService.getExpenses();
      console.log("Fetched expenses:", response.data);
      // Extract the expenses array from the response object
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch expenses"
      );
      setExpenses([]); // Reset expenses on error
    } finally {
      setLoading(false);
    }
  };

  // CRUD operations
  const addExpense = async (expenseData) => {
    try {
      const response = await expenseService.addExpense(expenseData);
      setExpenses((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error adding expense:", error);
      throw error;
    }
  };

  const updateExpense = async (id, updatedData) => {
    try {
      const response = await expenseService.updateExpense(id, updatedData);
      setExpenses((prev) =>
        prev.map((expense) => (expense._id === id ? response.data : expense))
      );
      return response.data;
    } catch (error) {
      console.error("Error updating expense:", error);
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expenseService.deleteExpense(id);
      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};

export default useExpenses;
