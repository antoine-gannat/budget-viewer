import React, { useState } from 'react';
import { Dropdown, Option, makeStyles } from '@fluentui/react-components';
import { Categories } from '../Categories/Categories';
import { Summary } from '../Summary/Summary';

type Tab = 'summary' | 'categories' | 'expenses';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    width: '100%',
  },
  dropdown: {
    minWidth: '200px',
  },
});

export function Viewer() {
  const [selectedTab, setSelectedTab] = useState<Tab>('summary');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Dropdown
        className={styles.dropdown}
        placeholder="Select a view"
        value={selectedTab}
        onOptionSelect={(_, data) => setSelectedTab(data.optionValue as Tab)}
      >
        <Option value="summary">Summary</Option>
        <Option value="categories">Categories</Option>
        <Option value="expenses">Expenses</Option>
      </Dropdown>

      {/* Content based on selected tab */}
      {selectedTab === 'summary' && <Summary />}
      {selectedTab === 'categories' && <Categories />}
      {selectedTab === 'expenses' && <div>Expenses View</div>}
    </div>
  );
}
