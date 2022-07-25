import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import NewClientComponent from './features/clients/NewClientComponent';
import ClientDetailComponent from './features/clients/ClientDetailComponent';
import LoansComponent from './features/loans/LoansComponent';
import RepaymentsComponent from './features/loans/RepaymentsComponent';
import ReportsComponent from './features/reports/ReportsComponent';
import NewLoan from './features/loans/NewLoan';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='new-client' element={<NewClientComponent />}></Route>
          <Route path='clients/:id' element={<ClientDetailComponent />}>
            <Route path='loans' element={<LoansComponent />}>
              <Route
                path=':loanId/repayments'
                element={<RepaymentsComponent />}
              ></Route>
            </Route>
            <Route path='new-loan' element={<NewLoan />}></Route>
          </Route>
          <Route path='reports' element={<ReportsComponent />}></Route>
          <Route path='repayments' element={<RepaymentsComponent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
