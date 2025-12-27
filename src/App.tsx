import React, { useState, useRef } from 'react';
import {
  Title1,
  Body1,
  Card,
  CardHeader,
  Button,
  Text,
} from '@fluentui/react-components';
import { ArrowUploadRegular } from '@fluentui/react-icons';
import { parseCSVFile } from './logic/parseCSVFile';
import { useStyles } from './App.styles';
import { Viewer } from './components/Viewer/Viewer';
import {
  ExpenseProvider,
  IExpense,
} from './components/Expense/ExpenseProvider';

function App() {
  const styles = useStyles();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvData, setCsvData] = useState<IExpense[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvData(parseCSVFile(text));
      };
      reader.onerror = () => {
        alert('Error reading file');
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          header={<Title1 className={styles.header}>Budget Viewer</Title1>}
          description={
            <Body1 className={styles.subtitle}>
              Welcome to your budget tracking application!
            </Body1>
          }
        />
        <div className={styles.uploadSection}>
          {csvData.length === 0 ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className={styles.fileInput}
              />
              <Button
                appearance="primary"
                icon={<ArrowUploadRegular />}
                onClick={handleUploadClick}
              >
                Select CSV File
              </Button>
            </div>
          ) : (
            <ExpenseProvider data={csvData} updateExpenses={setCsvData}>
              <Viewer />
            </ExpenseProvider>
          )}
        </div>
      </Card>
    </div>
  );
}

export default App;
