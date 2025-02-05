import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const SpendingChart = ({ data }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <PieChart width={400} height={400}>
            <Pie data={data} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default SpendingChart;
