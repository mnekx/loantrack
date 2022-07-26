import styleUtilities from '../../utility.module.css';
import loanStyles from './loans.module.css';
import repaymentStyles from './repayments.module.css';
import NewRepayment from './NewRepayment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RepaymentsComponent = () => {
  const [data, setData] = useState(null);
  const [openRepaymentForm, setOpenRepaymentForm] = useState(false);
  const { loanId } = useParams();
  useEffect(() => {
    fetch('/api/loans/' + loanId + '/repayments')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  });
  const dataTable = (
    <table className={`${styleUtilities.FillWidth}`}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount Due</th>
          <th>Reciever</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((repayment) => {
          const repaymentDate = new Date(repayment.date);
          return (
            <tr key={repayment._id}>
              <td>{repaymentDate.toDateString()}</td>
              <td>{Number(repayment.amount).toLocaleString()}</td>
              <td>Reciever</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
  const openRepayForm = () => {
    setOpenRepaymentForm((prevState) => !prevState);
  };
  return (
    <section
      className={`${styleUtilities.Section} ${loanStyles.Section} ${repaymentStyles.RepaymentsSection}`}
    >
      <h2>
        Repayments&nbsp;&nbsp;
        <button className={`${styleUtilities.Btn}`} onClick={openRepayForm}>
          {openRepaymentForm ? 'Close' : 'New'}
        </button>
      </h2>
      <NewRepayment open={openRepaymentForm} />
      <div>
        {data ? (
          data.length === 0 ? (
            <p>No repayments yet!</p>
          ) : (
            dataTable
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default RepaymentsComponent;
