import styles from './filtered-wadhamini.module.css';
import styleUtilities from '../../utility.module.css';
import { useEffect } from "react";

const FilteredWadhamini = (props) => {

  useEffect(() => {
    const ul = document.querySelector('ul');
    ul.style.top = props.pos + 170 + 'px';
  }, [props.pos])
  return (
    <ul className={`${styles.Ul} ${styleUtilities.DFlex}`}>
      {props.filteredList.map((customer) => (
        <li
          key={customer._id}
          className={`${styleUtilities.DFlex} ${styles.Li}`}
          onClick={() => props.onClickExistingMdhamini(customer._id)}
        >
          {customer.firstName} {customer.lastName} - {customer.phone}{' '}
          <img
            src={'http://localhost:3001/pics/' + customer.image}
            alt='customer'
            className={`${styles.Img}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default FilteredWadhamini;
