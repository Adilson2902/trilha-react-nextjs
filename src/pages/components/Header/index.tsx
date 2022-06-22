import React from 'react';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  return <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
             <img src='/images/logo.svg' alt='logo' />
             <nav>
                 <a className={styles.active}>Home</a>
                 <a className={styles.active}>Posts</a>
             </nav>
         </div>
         </header>;
}

export default Header;