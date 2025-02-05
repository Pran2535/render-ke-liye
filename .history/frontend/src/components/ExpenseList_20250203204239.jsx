import React from 'react';
import CustomCard from '@/components/ui/card';

const ExpenseList = ({ expenses }) => {
    return (
        <div>
            {expenses.map(expense => (
                <CustomCard key={expense.id}>
                    <p>{expense.category} - ${expense.amount}</p>
                    <p>{expense.date}</p>
                    <p>{expense.description}</p>
                </CustomCard>
            ))}
        </div>
    );
};

export default ExpenseList;