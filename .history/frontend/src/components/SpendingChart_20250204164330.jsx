// src/components/SpendingChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Fixed categories and their corresponding colors.
const categoryColors = {
  Food: '#0088FE',
  Travel: '#00C49F',
  Entertainment: '#FFBB28',
  Utilities: '#FF8042',
  Other: '#a83232',
};

const SpendingChart = ({ data }) => {
  return (
    <div className="flex flex-col items-center">
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ category, percentage }) => `${category}: ${percentage}%`}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={categoryColors[entry.category] || '#8884d8'}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
      </PieChart>
      {/* Custom Legend */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Legend</h3>
        <ul>
          {Object.entries(categoryColors).map(([cat, color]) => (
            <li key={cat} className="flex items-center">
              <span
                className="w-4 h-4 inline-block mr-2"
                style={{ backgroundColor: color }}
              ></span>
              <span>{cat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpendingChart;
