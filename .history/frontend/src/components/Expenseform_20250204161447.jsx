import React, { useState } from "react";
import Input from "../components/ui/Input"; // Custom input component
import Button from "../components/ui/Button"; // Custom button component

const ExpenseForm = ({ onSubmit, initialData = {} }) => {
    const [amount, setAmount] = useState(initialData.amount || "");
    const [category, setCategory] = useState(initialData.category || "");
    const [date, setDate] = useState(initialData.date || "");
    const [description, setDescription] = useState(initialData.description || "");

    const categories = ["Food", "Travel", "Entertainment", "Utilities", "Other"];

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format the data before sending it to the API
        const formattedData = {
            amount: Number(amount), // Convert amount to a number (integer or decimal)
            category: category.trim(),
            date: new Date(date).toISOString(), // Ensure ISO date format
            description: description.trim(),
        };

        // Basic validation
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
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount */}
            <Input
                type="text" // Allow both integer and decimal input
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                    const value = e.target.value;
                    // Only allow valid numbers (including decimals or empty string)
                    if (/^\d*\.?\d*$/.test(value)) {
                        setAmount(value);
                    }
                }}
                required
            />

            {/* Category */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
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
            />

            {/* Description */}
            <Input
                type="text"
                placeholder="Description (Optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
            />

            {/* Submit */}
            <Button type="submit">Add Expense</Button>
        </form>
    );
};

export default ExpenseForm;
