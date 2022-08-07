import styles from './reports.module.css';
import styleUtilities from '../../utility.module.css';
import React, { useEffect, useState } from 'react';

const ReportsComponent = () => {
  const [loans, setLoans] = useState([]);
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch('/api/loans', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        result.forEach((loan, i) => {
          const p1 = fetch('/api/customers/' + loan.customerID, {
            method: 'GET',
          })
            .then((res) => res.json())
            .then((customer) => {
              return { ...loan, customer: customer };
            });
          const p2 = fetch('/api/customers/' + loan.mdhaminiID, {
            method: 'GET',
          })
            .then((res) => res.json())
            .then((customer) => {
              return { ...loan, mdhamini: customer };
            });
          const p3 = fetch('/api/loans/' + loan._id + '/repayments', {
            method: 'GET',
          })
            .then((res) => res.json())
            .then((repayments) => {
              return { ...loan, repayments: repayments };
            });
          Promise.all([p1, p2, p3]).then((values) =>
            console.log({ ...values[0], ...values[1], ...values[2] })
          );
        });
      });
  }, []);

  return (
    <section className={`${styleUtilities.Section} ${styles.Section}`}>
      <h2>Reports</h2>
      <div>
        <table className={`${styles.Table}`}>
          <thead>
            <tr>
              <td></td>
              <td>Name</td>
              <td>Loan</td>
              <td>Amount Due</td>
              <td>Amount Paid</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Somename Somename</td>
              <td>25,000</td>
              <td>30,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default ReportsComponent;
