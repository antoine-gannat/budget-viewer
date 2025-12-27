import { PieChartCategory } from '../Charts/PieChartCategory';
import { useExpenses } from '../Expense/ExpenseProvider';
import { useStyles } from './Summary.styles';

export function Summary() {
  const expenses = useExpenses();
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <h1>Summary</h1>
      <PieChartCategory data={expenses} />
    </div>
  );
}
