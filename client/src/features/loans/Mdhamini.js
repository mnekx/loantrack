import styleUtilities from '../../utility.module.css';
import styles from './mdhamini.module.css';
import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';

const Mdhamini = (props) => {
  const [loading, setLoading] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const onSubmitData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);
    fetch('/api/customers', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setCreatedUser({ ...result.data });
        props.onMoveMdhamini({ ...result.data });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const createdUserDiv = (
    <div>
      <p>
        Fullname:&nbsp;
        <span>
          <b>{createdUser?.firstName + ' ' + createdUser?.lastName}</b>
        </span>
      </p>
      <p>
        Phone Number:{' '}
        <span>
          <b>{createdUser?.phone}</b>
        </span>
      </p>
      <img
        src={'http://localhost:3001/pics/' + createdUser?.image}
        alt='customer'
        className={`${styles.Img}`}
      />
    </div>
  );
  const userCreationForm = (
    <form
      onSubmit={(e) => onSubmitData(e)}
      className={`${styleUtilities.CenterContainer} ${styleUtilities.DFlex} ${styleUtilities.FlexDirCol} ${styleUtilities.AlignItemsStart}`}
    >
      <label
        htmlFor='first-name'
        className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
      >
        First name
        <input
          type='text'
          name='firstName'
          id='first-name'
          placeholder='First Name'
          className={`${styles.Input} ${styleUtilities.Input}`}
        />
      </label>
      <label
        htmlFor='last-name'
        className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
      >
        Last name
        <input
          type='text'
          name='lastName'
          id='last-name'
          placeholder='Last Name'
          className={`${styles.Input} ${styleUtilities.Input}`}
        />
      </label>
      <label
        htmlFor='birth-date'
        className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
      >
        Birth date
        <input
          type='date'
          name='birthDate'
          id='birth-date'
          placeholder='Birth date'
          className={`${styles.Input} ${styleUtilities.Input}`}
        />
      </label>
      <label
        htmlFor='phone'
        className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
      >
        Phone
        <input
          type='tel'
          name='phone'
          placeholder='0784-000000'
          pattern='0[6,7][1-9][1-9]-[0-9]{6}'
          required
          className={`${styles.Input} ${styleUtilities.Input}`}
        />
      </label>
      <label
        htmlFor='residence'
        className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
      >
        Residence
        <input
          type='text'
          id='residence'
          name='residence'
          placeholder='Last Name'
          className={`${styles.Input} ${styleUtilities.Input}`}
        />
      </label>
      <label
        htmlFor='pic'
        className={`${styleUtilities.MaxWidth} ${styleUtilities.DFlex} ${styles.Label}`}
      >
        Face shot
        <input
          type='file'
          id='pic'
          name='pic'
          className={`${styles.Input} ${styles.Pic} ${styleUtilities.Input}`}
        />
      </label>

      <button type='submit' className={`${styleUtilities.Btn} ${styles.Btn}`}>
        Add
        <AiOutlineUserAdd size={20} />
      </button>
    </form>
  );
  const loadingP = <p>Loading...</p>;
  return (
    <section className={`${styleUtilities.Section} ${styles.Section}`}>
      <h3>Mdhamini</h3>
      {loading ? loadingP : createdUser ? createdUserDiv : userCreationForm}
    </section>
  );
};

export default Mdhamini
