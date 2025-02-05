import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ExpenseForm = ({ onSubmit, initialData = {} }) => {
    const [amount, setAmount] = useState(initialData.amount || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [date, setDate] = useState(initialData.date || '');
    const [description, setDescription] = useState(initialData.description || '');

    const categories = ["Food", "Travel", "Entertainment", "Utilities", "Other"];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Format the data according to the schema requirements
        const formattedData = {
            amount: Number(amount), // Convert to number
            category: category,
            date: new Date(date), // Convert to Date object
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

        onSubmit(formattedData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min="0"
                step="0.01"
                required
            />
            
            <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
            >
                <option value="">Select Category</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <Input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                required
            />

            <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxLength={500}
            />

            <Button type="submit">Add Expense</Button>
        </form>
    );
};

export default ExpenseForm;