import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import ItemsTable from './ItemsTable/ItemsTable';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const newLocal = '/itemslist/:id';
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<App />} />
        <Route path={newLocal} element={<ItemsTable />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
