import React from 'react';
import { Link } from 'react-router-dom';
import useExpenses from '@/hooks/useExpenses';
import ExpenseList from '@/components/ExpenseList';
import SpendingChart from '@/components/SpendingChart';
import ThemeToggle from '@/components/ThemeToggle';

const Dashboard = () => {
    const { expenses, loading } = useExpenses();

    // Prepare data for the spending chart (group by category)
    const chartData = expenses.reduce((acc, expense) => {
        const existing = acc.find(item => item.category === expense.category);
        if (existing) {
            existing.value += Number(expense.amount);
        } else {
            acc.push({ category: expense.category, value: Number(expense.amount) });
        }
        return acc;
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <ThemeToggle />
            </div>
            <div className="mb-6">
                <Link to="/add-expense" className="text-blue-500 underline">
                    Add New Expense
                </Link>
            </div>
            {loading ? (
                <p>Loading expenses...</p>
            ) : (
                <>
                    <ExpenseList expenses={expenses} />
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Spending Insights</h2>
                        {chartData.length > 0 ? (
                            <SpendingChart data={chartData} />
                        ) : (
                            <p>No data available for chart.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
