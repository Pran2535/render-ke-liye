import React from 'react';
import { Link } from 'react-router-dom';
import useExpenses from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import SpendingChart from '../components/SpendingChart';
import ThemeToggle from '../components/ThemeToggle';

const Dashboard = () => {
  const { expenses, loading, error } = useExpenses();

  // Prepare data for the spending chart (group by category)
  const getChartData = () => {
    if (!Array.isArray(expenses)) return [];
    return expenses.reduce((acc, expense) => {
      // Ensure expense is valid and has required properties
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
  };

  const chartData = getChartData();

  // Show error state if an error occurred while fetching expenses
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ThemeToggle />
      </div>
      <div className="mb-6">
        <Link 
          to="/add-expense" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Expense
        </Link>
      </div>
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
              <ExpenseList expenses={expenses} />
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
