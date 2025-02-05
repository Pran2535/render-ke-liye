import React from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/Expenseform";
import expenseService from "../services/Expenseservice";

const AddEditExpense = () => {
    const navigate = useNavigate();

    const handleSubmit = async (expenseData) => {
        try {
            await expenseService.addExpense(expenseData); // API call
            alert("Expense added successfully!");
            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            console.error("Error adding expense:", error.response?.data || error.message);
            alert("Failed to add expense. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
            <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
            <ExpenseForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddEditExpense;
