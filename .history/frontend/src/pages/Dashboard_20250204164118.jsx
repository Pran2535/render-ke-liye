// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useExpenses from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import SpendingChart from '../components/SpendingChart';
import ThemeToggle from '../components/Themetoggle';
import expenseService from '../services/Expenseservice';

const Dashboard = () => {
  const { expenses, loading, error, deleteExpense } = useExpenses();
  const [insights, setInsights] = useState(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState(null);

  // Prepare data for the spending chart (group by category and compute percentage)
  const getChartData = () => {
    if (!Array.isArray(expenses)) return [];
    const grouped = expenses.reduce((acc, expense) => {
      if (!expense || !expense.category || !expense.amount) return acc;
      const existing = acc.find(item => item.category === expense.category);
      if (existing) {
        existing.value += Number(expense.amount) || 0;
      } else {
        acc.push({
          category: expense.category,
          value: Number(expense.amount) || 0,
        });
      }
      return acc;
    }, []);
    const total = grouped.reduce((sum, item) => sum + item.value, 0);
    return grouped.map(item => ({
      ...item,
      percentage: total > 0 ? ((item.value / total) * 100).toFixed(2) : '0.00'
    }));
  };

  const chartData = getChartData();

  // Call insights API when button is clicked
  const handleGetInsights = async () => {
    try {
      setInsightsLoading(true);
      setInsightsError(null);
      const response = await expenseService.getSpendingInsights();
      // Assume insights API returns useful data; adjust as needed.
      setInsights(response.data);
    } catch (error) {
      console.error("Error fetching insights:", error);
      setInsightsError(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch insights"
      );
    } finally {
      setInsightsLoading(false);
    }
  };

  if (!loading && error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <ThemeToggle />
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
        <div className="mt-4">
          <Link 
            to="/add-expense" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Expense
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header and Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ThemeToggle />
      </div>
      <div className="flex space-x-4 mb-6">
        <Link 
          to="/add-expense" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Expense
        </Link>
        <button
          onClick={handleGetInsights}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {insightsLoading ? "Loading Insights..." : "Get Insights"}
        </button>
      </div>
      {insightsError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{insightsError}</p>
        </div>
      )}
      {insights && (
        <div className="bg-gray-100 border border-gray-300 text-gray-800 p-4 rounded mb-4">
          <h2 className="text-xl font-bold mb-2">Insights Data</h2>
          <pre>{JSON.stringify(insights, null, 2)}</pre>
        </div>
      )}
      {/* Expense List and Chart */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-600">Loading expenses...</p>
        </div>
      ) : (
        <>
          {expenses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No expenses found. Add your first expense!</p>
            </div>
          ) : (
            <>
              <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Spending Insights</h2>
                {chartData.length > 0 ? (
                  <SpendingChart data={chartData} />
                ) : (
                  <p className="text-gray-600">No data available for chart.</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
