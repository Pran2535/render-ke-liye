import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ExpenseList = ({ expenses }) => {
    return (
        <div className="space-y-2">
            {expenses.map(expense => (
                <Card key={expense.id}>
                    <CardContent>
                        <p className="font-semibold">{expense.category} - ${expense.amount}</p>
                        <p className="text-sm text-gray-600">{expense.date}</p>
                        <p className="text-gray-700">{expense.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ExpenseList;
