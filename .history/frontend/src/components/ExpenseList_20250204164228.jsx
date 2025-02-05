// src/components/ExpenseList.jsx
import React from 'react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="expense-list">
      {expenses.map(expense => (
        <div key={expense._id} className="flex justify-between items-center border p-4 mb-2 rounded">
          <div>
            <h3 className="text-xl font-bold">{expense.category}</h3>
            <p>{expense.description}</p>
            <p>{expense.formattedAmount}</p>
            <p>{new Date(expense.date).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => onDeleteExpense(expense._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
