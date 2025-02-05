mport api from '@/utils/api';

const expenseService = {
    getExpenses: () => api.get('/expenses'),
    addExpense: (data) => api.post('/expenses', data),
    deleteExpense: (id) => api.delete(`/expenses/${id}`)
};

export default expenseService;
