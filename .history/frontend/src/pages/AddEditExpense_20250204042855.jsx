import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '@/components/ExpenseForm';
import expenseService from '@/services/expenseService';

const AddEditExpense = () => {
    const navigate = useNavigate();

    const handleSubmit = async (expenseData) => {
        try {
            await expenseService.addExpense(expenseData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding expense', error);
            alert('Failed to add expense');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
            <h2 className="text-2xl mb-4">Add Expense</h2>
            <ExpenseForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddEditExpense;
