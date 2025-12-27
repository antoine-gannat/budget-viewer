import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
