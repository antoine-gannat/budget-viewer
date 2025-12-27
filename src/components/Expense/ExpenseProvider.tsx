import React from 'react';

export interface IExpense {
  date: string;
  title: string;
  amount: string;
  // if true, money was credited, if false, money was debited
  isCredit: boolean;
  category?: string;
}

type ExpenseContextType = {
  data: Array<IExpense>;
  updateExpenses: (data: Array<IExpense>) => void;
};

const ExpenseContext = React.createContext<ExpenseContextType>({
  data: [],
  updateExpenses: () => {},
});

export function ExpenseProvider({
  data,
  updateExpenses,
  children,
}: React.PropsWithChildren<ExpenseContextType>) {
  return (
    <ExpenseContext.Provider value={{ data, updateExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => React.useContext(ExpenseContext).data;
export const useUpdateExpenses = () =>
  React.useContext(ExpenseContext).updateExpenses;
