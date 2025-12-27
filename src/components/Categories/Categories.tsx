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
import { getSavedCategories, saveCategories } from '../../logic/storage';

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

    category = category.toLowerCase();

    categoryChangeTimeoutRef.current = setTimeout(() => {
      const savedCategories = getSavedCategories();
      const updatedExpenses = [...expenses];

      let categoryEntry = savedCategories.find((cat) => cat.name === category);
      if (!categoryEntry) {
        categoryEntry = { name: category, matchingTitles: [] };
        savedCategories.push(categoryEntry);
      }
      // find all expenses with the same title and update their category too
      const titleToMatch = updatedExpenses[index].title;
      if (!categoryEntry.matchingTitles.includes(titleToMatch)) {
        categoryEntry.matchingTitles.push(titleToMatch);
      }
      updatedExpenses.forEach((expense, i) => {
        if (expense.title === titleToMatch) {
          updatedExpenses[i] = { ...expense, category };
        }
      });
      saveCategories(savedCategories);
      updateExpenses(updatedExpenses);
    }, 500); // Debounce saving to avoid excessive updates
  };

  const bodyContent = React.useMemo(
    () =>
      expenses
        .sort((a, b) => {
          if (!a.category && b.category) return -1;
          if (a.category && !b.category) return 1;
          return 0;
        }) // sort to move all categorized expenses to the bottom
        .map(({ title, category, date, isCredit, amount }, index) => (
          <TableRow
            key={`${title}-${index}-${date}`}
            style={{ fontWeight: !!category ? 700 : 0 }}
          >
            <TableCell>{date}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>
              {isCredit ? '+' : '-'}
              {amount}€
            </TableCell>
            <TableCell>
              <Input
                defaultValue={category || ''}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                placeholder="Enter category"
              />
            </TableCell>
          </TableRow>
        )),
    [expenses]
  );

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
        <TableBody>{bodyContent}</TableBody>
      </Table>
    </div>
  );
}
