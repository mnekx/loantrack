import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import stylesUtilities from '../../utility.module.css';
import styles from './loans.module.css';
const LoansComponent = () => {
  const params = useParams();
  const [loans, setLoans] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/api/customers/' + params.id + '/loans', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => setLoans(result));
  }, [params.id]);
  const handleLoanClicked = (loanId) => {
    navigate(loanId + '/repayments');
  };
  return (
    <section className={`${stylesUtilities.Section} ${styles.Section}`}>
      <h2>Loans</h2>
      <div>
        {loans?loans.length === 0?<p>No loans yet!</p>:<ul className={`${styles.Ul}`}>
          {console.log(loans)}
          {loans?.map((loan) => {
            const strDate = new Date(loan.startdate);
            const endDate = new Date(loan.enddate);
            return (
              <li
                className={`${styles.Li} ${stylesUtilities.DFlex}`}
                onClick={() => handleLoanClicked(loan._id)}
              >
                <Link
                  to={
                    '/clients/' +
                    params.customerId +
                    '/loans/' +
                    loan._id +
                    '/repayments'
                  }
                >
                  {strDate.toDateString()} --{'>'} {endDate.toDateString()}
                </Link>
              </li>
            );
          })}
        </ul>:<p>Loading...</p>}
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default LoansComponent;
