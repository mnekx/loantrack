import styleUtilities from '../../utility.module.css';
import styles from './clients.module.css';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ClientsComponent = ({ opened }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allClients, setAllClients] = useState([])
  useEffect(() => {
    setLoading(true)
    fetch('/api/customers', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false)
        setClients(result);
        setAllClients(result)
      });
  }, []);
  const classname = opened ? styles.Opened : styles.Closed;
  const navigate = useNavigate();
  const Trs = clients.map((client) => {
    return (
      <tr key={client?._id} className={`${styles.Item}`}>
        <td className={`${styles.FirstTd}`}>
          <BsFillArrowRightCircleFill
            size={20}
            className={`${styles.OpenableBtn}`}
          />
        </td>
        <td className={`${styles.SecondTd}`}>
          <Link to={'/clients/'+client?._id}>
            {client?.firstName.toUpperCase() + ' ' + client?.lastName.toUpperCase()}
          </Link>
        </td>
        <td>{<Link to={'/clients/'+client?._id+'/loans'}>4</Link>}</td>
        <td>{4}</td>
      </tr>
    );
  });
  const handleSearch = (e) => {
    const re = new RegExp(`${e.target.value}`, 'img');
    const newFilteredList = allClients.filter(client => client.firstName.match(re) !== null)
    setClients(newFilteredList)
  }
  return (
    <section
      className={`${styleUtilities.Section} ${styles.Section} ${classname}`}
    >
      <h2 className={`${styles.H2}`}>
        <input
          className={`${styleUtilities.Input} ${styles.Input}`}
          type='text'
          placeholder='Search'
          onChange={handleSearch}
        />
        <button
          onClick={() => navigate('/new-client', { replace: false })}
          className={`${styleUtilities.Btn} ${styles.Btn} ${styleUtilities.ImportantGoBtn}`}
        >
          New <AiOutlineUserAdd size={20} />
        </button>
      </h2>
      <table className={`${styleUtilities.FillWidth} ${styles.Container}`}>
        <thead>
          <tr>
            <th className={`${styles.FirstTh}`}></th>
            <th className={`${styles.SecondTh}`}>Name</th>
            <th>Loans Total</th>
            <th>Last seen (Days)</th>
          </tr>
        </thead>
        <tbody className={`${styles.TBody}`}>
        { loading? 'Loading...': Trs}
        </tbody>
      </table>
    </section>
  );
};

export default ClientsComponent;
