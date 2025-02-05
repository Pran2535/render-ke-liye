import React, { useState } from 'react';
import CustomInput from '@/components/ui/input';
import CustomButton from '@/components/ui/button';

const ExpenseForm = ({ onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ amount, category, date, description });
    };

    return (
        <form onSubmit={handleSubmit}>
            <CustomInput type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <CustomInput type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <CustomInput type="date" value={date} onChange={e => setDate(e.target.value)} />
            <CustomInput type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <CustomButton type="submit">Add Expense</CustomButton>
        </form>
    );
};

export default ExpenseForm;