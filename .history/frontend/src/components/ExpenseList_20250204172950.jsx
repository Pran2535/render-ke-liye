// src/components/ExpenseList.jsx
import React from 'react';

const ExpenseList = ({ expenses, onDeleteExpense, onUpdateExpense }) => {
  const handleUpdate = async (expense) => {
    // Prompt user for new values (you can extend this with a proper form or modal)
    const newDescription = prompt("Enter new description", expense.description);
    if (newDescription === null) return; // User cancelled

    const newAmountStr = prompt("Enter new amount", expense.amount);
    if (newAmountStr === null) return; // User cancelled

    const newAmount = parseFloat(newAmountStr);
    if (isNaN(newAmount)) {
      alert("Invalid amount entered.");
      return;
    }

    const updatedData = {
      description: newDescription,
      amount: newAmount,
      // Optionally update other fields as needed (e.g., category)
    };

    try {
      await onUpdateExpense(expense._id, updatedData);
      alert("Expense updated successfully!");
    } catch (error) {
      alert("Error updating expense.");
    }
  };

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
          <div className="space-x-2">
            <button
              onClick={() => onDeleteExpense(expense._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => handleUpdate(expense)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
