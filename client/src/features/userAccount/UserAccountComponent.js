import { MdAccountBox } from 'react-icons/md';
import styles from './styles.module.css';
import utilities from '../../utility.module.css';

const UserAccountComponent = () => (
  <div className={`${styles.Container} ${utilities.DFlex}`}>
    <MdAccountBox className={`${styles.UserPic}`} size={60} />
    <label htmlFor='account-settings'>
      mnekx &nbsp;
      <select name='accountSettings' id='account-settings'>
        <option value='logout'>
          Logout  
        </option>
      </select>
    </label>
  </div>
);

export default UserAccountComponent;
