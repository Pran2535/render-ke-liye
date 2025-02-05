import { useState, useEffect } from "react";
import expenseService from "@/services/expenseService";

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const response = await expenseService.getExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { expenses, loading, fetchExpenses };
};

export default useExpenses;
