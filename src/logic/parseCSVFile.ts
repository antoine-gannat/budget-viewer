import { IExpense } from '../components/Expense/ExpenseProvider';

const cleanup = (str: string) => str.trim().replace(/(^"|"$)/g, '');

const parseDDMMYYYY = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Remove the "CARTE DD/MM" if any
const removeCardPrefix = (str: string): string => {
  const cardPrefixRegex = /^CARTE \d{2}\/\d{2} /;
  return str.replace(cardPrefixRegex, '');
};

export function parseCSVFile(csvContent: string): Array<IExpense> {
  const lines = csvContent.split('\n');
  return lines
    .slice(1)
    .map((line) => {
      const [date, _, title, debit, credit] = line.split(';');
      const isCredit = cleanup(credit) !== '';
      const amount = isCredit ? cleanup(credit) : cleanup(debit);
      return {
        date: cleanup(date),
        title: removeCardPrefix(cleanup(title)),
        amount,
        isCredit,
      };
    })
    .sort(
      (a, b) =>
        parseDDMMYYYY(b.date).getTime() - parseDDMMYYYY(a.date).getTime()
    );
}
