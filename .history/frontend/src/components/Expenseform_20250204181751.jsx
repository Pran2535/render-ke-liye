import React, { useState } from "react";
import Input from "../components/ui/Input"; // Custom input component
import Button from "../components/ui/Button"; // Custom button component

const ExpenseForm = ({ onSubmit, initialData = {} }) => {
    const [amount, setAmount] = useState(initialData.amount || "");
    const [category, setCategory] = useState(initialData.category || "");
    const [date, setDate] = useState(initialData.date || "");
    const [description, setDescription] = useState(initialData.description || "");
    const [theme, setTheme] = useState('light');

    const categories = ["Food", "Travel", "Entertainment", "Utilities", "Other"];

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedData = {
            amount: Number(amount),
            category: category.trim(),
            date: new Date(date).toISOString(),
            description: description.trim(),
        };

        if (isNaN(amount) || Number(amount) <= 0) {
            alert("Amount must be a positive number.");
            return;
        }

        if (!categories.includes(category)) {
            alert("Please select a valid category.");
            return;
        }

        if (!date || new Date(date) > new Date()) {
            alert("Please provide a valid date.");
            return;
        }

        onSubmit(formattedData); // Pass formatted data to parent
    };

    return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className={`w-full max-w-md p-8 space-y-6 rounded-xl shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                {/* Theme Toggle */}
                <div className="flex justify-end">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors duration-300 
                            ${theme === 'dark' 
                                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                            }`}
                    >
                        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>

                {/* Expense Form Header */}
                <div className="text-center">
                    <h2 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        Add New Expense
                    </h2>
                    <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Keep track of your spending
                    </p>
                </div>

                {/* Expense Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Amount */}
                    <Input
                        type="text"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*\.?\d*$/.test(value)) {
                                setAmount(value);
                            }
                        }}
                        required
                        className={`w-full p-3 rounded-lg border transition-colors duration-300 
                            ${theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                    />

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`w-full p-3 rounded-lg border transition-colors duration-300 
                            ${theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* Date */}
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        max={new Date().toISOString().split("T")[0]} // Prevent future dates
                        required
                        className={`w-full p-3 rounded-lg border transition-colors duration-300 
                            ${theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                    />

                    {/* Description */}
                    <Input
                        type="text"
                        placeholder="Description (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={500}
                        className={`w-full p-3 rounded-lg border transition-colors duration-300 
                            ${theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className={`w-full py-3 rounded-lg transition-colors duration-300 
                            ${theme === 'dark' 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        Add Expense
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ExpenseForm;
