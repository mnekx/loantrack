import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import styles from './client-detail.module.css';
import styleUtilities from '../../utility.module.css';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useEffect, useState } from 'react';
const ClientDetailComponent = () => {
  const [data, setData] = useState(null);
  const [loans, setLoans] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    fetch('/api/customers/' + id, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setData(result);
      });
    fetch('/api/customers/' + id + '/loans', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => setLoans(result));
  }, [id]);
  return loading ? (
    <div className={`${styles.Section} ${styleUtilities.Section}`}>
      <p>Loading...</p>
    </div>
  ) : (
    <section className={`${styles.Section} ${styleUtilities.Section}`}>
      <h2 className={`${styles.H2} ${styleUtilities.DFlex}`}>
        {data?.firstName.toUpperCase() + ' ' + data?.lastName.toUpperCase()}{' '}
        <img
          className={`${styles.Img}`}
          src={'http://localhost:3001/pics/' + data?.image}
          alt={data?.lastname}
        />
      </h2>
      <div>
        <p className={`${styles.P}`}>
          Loans:{' '}
          <b>
            {' '}
            <Link to='loans'>{loans?.length}</Link>
          </b>
        </p>
      </div>
      <button
        onClick={() => navigate(`/clients/${id}/new-loan`, { replace: false })}
        className={`${styleUtilities.Btn} ${styles.Btn} ${styleUtilities.ImportantGoBtn}`}
      >
        New loan <AiOutlineFileAdd size={20} />
      </button>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default ClientDetailComponent;
