import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import styleUtilities from './utility.module.css';
import utilities from './utility.module.css';
import UserAccountComponent from './features/userAccount/UserAccountComponent';
import NavBar from './features/navbar/NavBar';
import SideNavComponent from './features/sidenav/SideNavComponent';

function App() {
  return (
    <div className={`${styles.App} ${styles.Wrapper}`}>
      <header
        className={`${styles.AppHeader} ${styleUtilities.DFlex}`}
      ></header>
      <main className={`${styleUtilities.DFlex} ${styles.Main}`}>
        <nav className={`${utilities.DFlex} ${styles.Nav}`}>
          <UserAccountComponent />
          <NavBar />
        </nav>
        <Outlet />
        <SideNavComponent />
      </main>
    </div>
  );
}

export default App;
