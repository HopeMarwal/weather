import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//Mui context
import { ThemeProvider } from '@mui/material';
import { theme } from './utils/theme';
//Unit context
import { UnitProvider } from './context/unitContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UnitProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UnitProvider>
  </React.StrictMode>
);
reportWebVitals();
