import React, { useState, useRef } from 'react';
import {
  IExpense,
  useExpenses,
  useUpdateExpenses,
} from '../Expense/ExpenseProvider';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Input,
  makeStyles,
} from '@fluentui/react-components';

interface ICategory {
  name: string;
  matchingTitles: string[];
}

const useStyles = makeStyles({
  container: {
    padding: '20px',
  },
  table: {
    marginTop: '20px',
  },
});

export function Categories() {
  const expenses = useExpenses();
  const updateExpenses = useUpdateExpenses();
  const categoryChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const styles = useStyles();

  const handleCategoryChange = (index: number, category: string) => {
    categoryChangeTimeoutRef.current &&
      clearTimeout(categoryChangeTimeoutRef.current);

    categoryChangeTimeoutRef.current = setTimeout(() => {
      console.log('handleCategoryChange', index, category);
      const updatedExpenses = [...expenses];
      updatedExpenses[index].category = category;
      updateExpenses(updatedExpenses);
    }, 500); // Debounce saving to avoid excessive updates
  };

  return (
    <div className={styles.container}>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map(
            ({ title, category, date, isCredit, amount }, index) => (
              <TableRow key={index}>
                <TableCell>{date}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>
                  {isCredit ? '+' : '-'}
                  {amount}
                </TableCell>
                <TableCell>
                  <Input
                    defaultValue={category || ''}
                    onChange={(e) =>
                      handleCategoryChange(index, e.target.value)
                    }
                    placeholder="Enter category"
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
