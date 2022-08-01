import styles from './filtered-wadhamini.module.css';

const FilteredWadhamini = (props) => {
  return (
    <ul className={`${styles.Ul}`}>
      {props.filteredList.map((customer) => (
        <li key={customer._id}>
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
