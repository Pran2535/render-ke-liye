import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useExpenses from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import SpendingChart from '../components/SpendingChart';
import ThemeToggle from '../components/ThemeToggle';
import expenseService from '../services/Expenseservice';
import authService from '../services/Authservice';

const Dashboard = () => {
  const navigate = useNavigate();
  const { expenses, loading, error, deleteExpense, updateExpense } = useExpenses();
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

  // Toggle Insights: If insights exist, hide them; otherwise, fetch them
  const handleToggleInsights = async () => {
    if (insights) {
      setInsights(null);
    } else {
      try {
        setInsightsLoading(true);
        setInsightsError(null);
        const response = await expenseService.getSpendingInsights();
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
    }
  };

  // Logout function: Call the logout API and redirect to the login page
  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!loading && error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="bg-red-500 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="bg-red-100 dark:bg-red-800 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
        <div className="mt-4">
          <Link 
            to="/add-expense" 
            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Add New Expense
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-screen-lg mx-auto">
        {/* Header and Navigation */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="bg-red-500 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
          <Link 
            to="/add-expense" 
            className="mb-4 sm:mb-0 bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded text-center"
          >
            Add New Expense
          </Link>
          <button
            onClick={handleToggleInsights}
            className="bg-green-500 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            {insightsLoading
              ? "Loading Insights..."
              : insights
                ? "Hide Insights"
                : "Get Insights"}
          </button>
        </div>
        {insightsError && (
          <div className="bg-red-100 dark:bg-red-800 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
            <p>{insightsError}</p>
          </div>
        )}
        {insights && (
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 p-4 rounded mb-4">
            <h2 className="text-xl font-bold mb-2">Insights Data</h2>
            {/* Customize the insights display as needed */}
            <pre>{JSON.stringify(insights, null, 2)}</pre>
          </div>
        )}
        {/* Expense List and Chart */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-600 dark:text-gray-400">Loading expenses...</p>
          </div>
        ) : (
          <>
            {expenses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No expenses found. Add your first expense!
                </p>
              </div>
            ) : (
              <>
                <ExpenseList 
                  expenses={expenses} 
                  onDeleteExpense={deleteExpense} 
                  onUpdateExpense={updateExpense} 
                />
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Spending Insights</h2>
                  {chartData.length > 0 ? (
                    <SpendingChart data={chartData} />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      No data available for chart.
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
