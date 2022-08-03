import styleUtilities from '../../utility.module.css';
import styles from './newLoanStyles.module.css';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useState } from 'react';
import Mdhamini from './Mdhamini';
import { useParams } from 'react-router-dom';
const NewLoan = () => {
  const [createdMdhamini, setCreatedMdhamini] = useState(null);
  const [createdloan, setCreatedLoan] = useState(null);
  const [repayment, setRepayment] = useState(0);
  const params = useParams();
  const moveMdhamini = (mdhamini) => {
    setCreatedMdhamini(mdhamini);
  };
  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(createdMdhamini);
    formData.append('mdhaminiID', createdMdhamini?._id);
    formData.append('customerID', params.id);
    fetch('/api/loans', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setCreatedLoan(result)
      });
  };

  const calculateRepayment = (e) => {
    const repayment = Number(e.target.value) / 30
    setRepayment(repayment)
  }
  return (
    <section className={`${styles.Section} ${styleUtilities.Section}`}>
      <h2>New Loan</h2>
      {createdloan?<div><p>Loan Creacted!</p></div>:<div>
        <Mdhamini onMoveMdhamini={moveMdhamini} />

        <form
          onSubmit={(e) => handleOnFormSubmit(e)}
          className={`${styleUtilities.CenterContainer} ${styleUtilities.DFlex} ${styleUtilities.FlexDirCol} ${styleUtilities.AlignItemsStart}`}
        >
          <label
            htmlFor='loan-amt'
            className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
          >
            Loan Amount
            <input
              type='number'
              placeholder='Amount'
              id='loan-amt'
              name='amount'
              className={`${styles.Input} ${styleUtilities.Input}`}
              required
              onChange={calculateRepayment}
            />
          </label>
          <label
            htmlFor='start-date'
            className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
          >
            Start
            <input
              type='date'
              id='start-date'
              placeholder='Start date'
              name='startdate'
              className={`${styles.Input} ${styleUtilities.Input}`}
              required
            />
          </label>
          <label
            htmlFor='end-date'
            className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
          >
            End
            <input
              type='date'
              id='end-date'
              placeholder='End date'
              name='enddate'
              className={`${styles.Input} ${styleUtilities.Input}`}
              required
            />
          </label>
          <button
            className={`${styleUtilities.Btn} ${styles.Btn} ${styleUtilities.ImportantGoBtn}`}
            type='submit'
          >
            Lend <AiOutlineFileAdd size={20} />
          </button>
        </form>
        <p>
          Daily Repayments: <b>{Number(repayment).toLocaleString()}</b>
        </p>
        <p>
          For <b>30</b> days.
        </p>
      </div>}
    </section>
  );
};

export default NewLoan;
