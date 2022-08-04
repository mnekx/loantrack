import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styleUtilities from '../../utility.module.css';
import styles from './styles.module.css';

const NavBar = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate()
  const buttons = ['']; // This was ment to to be dynamic for more than one button
  const handleClick = (i) => {
    setActive(i);
    navigate('/')
  };
  return (
    <div className={`${styleUtilities.DFlex} ${styles.Container}`}>
      {buttons.map((button, i) => {
        let className = i === active? styles.Active : '';
        return (
          <button
            className={`${styleUtilities.Btn} ${styles.Button} ${className}`}
            onClick={() => handleClick(i)}
            key={i}
          >
            Reports {/* since we have only one button else {button}*/}
          </button>
        );
      })}
    </div>
  );
};

export default NavBar;
