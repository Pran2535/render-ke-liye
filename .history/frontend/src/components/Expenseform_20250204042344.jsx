import React, { useState } from 'react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

const ExpenseForm = ({ onSubmit, initialData = {} }) => {
    const [amount, setAmount] = useState(initialData.amount || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [date, setDate] = useState(initialData.date || '');
    const [description, setDescription] = useState(initialData.description || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ amount, category, date, description });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
            />
            <Input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <Button type="submit">Add Expense</Button>
        </form>
    );
};

export default ExpenseForm;
