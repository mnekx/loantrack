import styleUtilities from '../../utility.module.css';
import styles from './mdhamini.module.css';
import { useEffect, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import lib from '../../server-comm/lib';
import FilteredWadhamini from './FilteredWadhamini';

const Mdhamini = (props) => {
  const [loading, setLoading] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [allCustomers, setAllCustomers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredListYPos, setFilteredListYPos] = useState(0);
  useEffect(() => {
    lib.fetch('/api/customers', 'GET', null, (resultObj) => {
      if (resultObj.data) {
        setAllCustomers(resultObj.data);
      } else {
        console.log(resultObj.error);
      }
    });
  }, []);
  useEffect(() => {
    setFilteredList([]);
  }, [createdUser]);
  const onSubmitData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);
    lib.fetch('/api/customers', 'POST', formData, (resultObj) => {
      if (resultObj.data) {
        setLoading(false);
        setCreatedUser({ ...resultObj.data.data });
        props.onMoveMdhamini({ ...resultObj.data.data });
      } else {
        console.error('Error:', resultObj.error);
      }
    });
  };
  const handleOnSearch = (e) => {
    const field = e.target.name;

    const re = new RegExp(`${e.target.value}`, 'img');
    const newFilteredList =
      e.target.value === ''
        ? []
        : allCustomers.filter((customer) => {
            return customer[field].match(re) !== null;
          });
    setFilteredList(newFilteredList);
  };

  const handleSearchableInputClick = (e) => {
    setFilteredListYPos(e.clientY);
  };
  const moveData = (mdhamini) => {
    props.onMoveMdhamini(mdhamini)
    
    setCreatedUser(mdhamini);
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
      className={`${styleUtilities.CenterContainer} ${`styles.Form`} ${
        styleUtilities.DFlex
      } ${styleUtilities.FlexDirCol} ${styleUtilities.AlignItemsStart}`}
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
          required
          onChange={(e) => handleOnSearch(e)}
          onClick={(e) => handleSearchableInputClick(e)}
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
          required
          onChange={(e) => handleOnSearch(e)}
          onClick={(e) => handleSearchableInputClick(e)}
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
          required
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
          onChange={(e) => handleOnSearch(e)}
          onClick={(e) => handleSearchableInputClick(e)}
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
          required
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
          required
        />
      </label>

      <button type='submit' className={`${styleUtilities.Btn} ${styles.Btn}`}>
        Add
        <AiOutlineUserAdd size={20} />
      </button>
    </form>
  );
  const loadingP = <p>Loading...</p>;
  let childKey = 1;
  return (
    <section className={`${styleUtilities.Section} ${styles.Section}`}>
      <h3>Mdhamini</h3>
      {loading ? loadingP : createdUser ? createdUserDiv : userCreationForm}
      {filteredList.length > 0 && (
        <FilteredWadhamini
          key={++childKey}
          filteredList={filteredList}
          pos={filteredListYPos}
          onClickExistingMdhamini={moveData}
        />
      )}
    </section>
  );
};

export default Mdhamini;
