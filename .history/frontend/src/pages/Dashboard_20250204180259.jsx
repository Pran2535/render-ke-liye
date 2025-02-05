import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useExpenses from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import SpendingChart from '../components/SpendingChart';
import ThemeToggle from '../components/Themetoggle';
import expenseService from '../services/Expenseservice';
import authService from '../services/Authservice';
import { LogOut, PlusCircle, BarChart2, Info } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { expenses, loading, error, deleteExpense, updateExpense } = useExpenses();
  const [insights, setInsights] = useState(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState(null);

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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-md">
            <p>{error}</p>
          </div>
          <div className="mt-6">
            <Link 
              to="/add-expense" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 w-max transition-colors"
            >
              <PlusCircle size={18} />
              <span>Add New Expense</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <Link 
            to="/add-expense" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 w-full sm:w-auto justify-center transition-colors"
          >
            <PlusCircle size={18} />
            <span>Add New Expense</span>
          </Link>
          <button
            onClick={handleToggleInsights}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 w-full sm:w-auto justify-center transition-colors"
          >
            <Info size={18} />
            <span>
              {insightsLoading
                ? "Loading Insights..."
                : insights
                  ? "Hide Insights"
                  : "Get Insights"}
            </span>
          </button>
        </div>
        
        {insightsError && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-md mb-4">
            <p>{insightsError}</p>
          </div>
        )}
        
        {insights && (
          <div className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 p-4 rounded-md mb-4">
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <BarChart2 className="mr-2" /> Insights Data
            </h2>
            <pre className="overflow-x-auto">{JSON.stringify(insights, null, 2)}</pre>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-600 dark:text-gray-300">Loading expenses...</p>
          </div>
        ) : (
          <>
            {expenses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-300">No expenses found. Add your first expense!</p>
              </div>
            ) : (
              <>
                <ExpenseList 
                  expenses={expenses} 
                  onDeleteExpense={deleteExpense} 
                  onUpdateExpense={updateExpense} 
                />
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <BarChart2 className="mr-2" /> Spending Insights
                  </h2>
                  {chartData.length > 0 ? (
                    <SpendingChart data={chartData} />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">No data available for chart.</p>
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