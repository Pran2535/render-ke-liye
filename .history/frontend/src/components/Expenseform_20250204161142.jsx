import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const ExpenseForm = ({ onSubmit, initialData = {} }) => {
    const [amount, setAmount] = useState(initialData.amount || "");
    const [category, setCategory] = useState(initialData.category || "");
    const [date, setDate] = useState(initialData.date || "");
    const [description, setDescription] = useState(initialData.description || "");

    const categories = ["Food", "Travel", "Entertainment", "Utilities", "Other"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Format the data according to the schema requirements
        const formattedData = {
            amount: Number(amount), // Convert to number
            category: category,
            date: new Date(date).toISOString(), // Convert to ISO string
            description: description.trim(),
        };

        // Basic validation
        if (amount <= 0) {
            alert("Amount must be positive");
            return;
        }

        if (!categories.includes(category)) {
            alert("Please select a valid category");
            return;
        }

        if (new Date(date) > new Date()) {
            alert("Date cannot be in the future");
            return;
        }

        try {
            // Call the parent component's submit handler
            await onSubmit(formattedData);
            console.log("Expense successfully added:", formattedData);
        } catch (error) {
            // Handle errors gracefully
            console.error("Error submitting expense:", error.response?.data || error.message);
            alert("Failed to add expense. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount Input */}
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                required
            />

            {/* Category Dropdown */}
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

            {/* Date Input */}
            <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]} // Ensure no future dates
                required
            />

            {/* Description Input */}
            <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
            />

            {/* Submit Button */}
            <Button type="submit">Add Expense</Button>
        </form>
    );
};

export default ExpenseForm;
