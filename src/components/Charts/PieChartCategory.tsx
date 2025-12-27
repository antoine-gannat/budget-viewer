import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { IExpense } from '../Expense/ExpenseProvider';

interface PieChartCategoryProps {
  data: IExpense[];
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FFC658',
  '#FF6B9D',
];

export const PieChartCategory: React.FC<PieChartCategoryProps> = ({ data }) => {
  const categoryData = React.useMemo(() => {
    const categoryMap = new Map<string, number>();

    data
      .filter((expense) => !expense.isCredit)
      .forEach((expense) => {
        const category = expense.category || 'Uncategorized';
        const amount = parseFloat(expense.amount.replace(',', '.'));
        categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
      });

    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
          }
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number | undefined) => `$${value?.toFixed(2)}`}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
