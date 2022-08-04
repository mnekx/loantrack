import styles from './newRepayment.module.css';
import styleUtilities from '../../utility.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NewRepayment = (props) => {
  const [open, setOpen] = useState(false);
  const { id, loanId } = useParams();
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('customerID', id);
    formData.append('loanID', loanId);
    fetch('/api/repayments', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <section
      className={`${styles.Section} ${
        open ? styleUtilities.DBlock : styleUtilities.DNone
      }`}
    >
      <h2>Add new repayment</h2>
      <form
        onSubmit={handleSubmit}
        className={`${styleUtilities.CenterContainer} ${styleUtilities.DFlex} ${styleUtilities.FlexDirCol} ${styleUtilities.AlignItemsStart}`}
      >
        <label
          htmlFor='date'
          className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
        >
          Date{' '}
          <input
            type='date'
            name='date'
            id='date'
            className={`${styles.Input} ${styleUtilities.Input}`}
            required
          />
        </label>
        <label
          htmlFor='amount'
          className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
        >
          Amount{' '}
          <input
            type='text'
            name='amount'
            id='amount'
            className={`${styles.Input} ${styleUtilities.Input}`}
            required
          />
        </label>
        <button type='submit' className={`${styleUtilities.Btn} ${styles.Btn}`}>
          Repay
        </button>
      </form>
    </section>
  );
};

export default NewRepayment;
