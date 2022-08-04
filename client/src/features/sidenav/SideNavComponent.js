import styles from './styles.module.css';
import styleUtilities from '../../utility.module.css';
import ClientsComponent from '../clients/ClientsComponent';
import { useState } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';

const SideNavComponent = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };
  let caretClassname = open? styles.LeftCaret: styles.RightCaret;
  return (
    <div className={`${styles.Container}`}>
      <ul className={`${styles.Ul}`}>
        <li>
          <button
            onClick={() => handleToggle()}
            className={`${styles.LinkButton} ${styleUtilities.DFlex}`}
          >
            Clients
            <AiFillCaretRight className={caretClassname}/>
          </button>
        </li>
      </ul>

      <div className={`${styleUtilities.Section} ${styles.Section}`}>
        <ClientsComponent opened={open} />
      </div>
    </div>
  );
};

export default SideNavComponent;
