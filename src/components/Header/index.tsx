import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ActiveLink from '../ActiveLink';
import SignInButton from '../SignInButton';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { asPath } = useRouter();


  return <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
             <img src='/images/logo.svg' alt='logo' />
             <nav>
                 <ActiveLink activeClassName={styles.active} href="/">
                    <a>Home</a>
                 </ActiveLink>
                 <ActiveLink activeClassName={styles.active} href='/posts'>
                    <a>Posts</a>
                 </ActiveLink>
             </nav>

             <SignInButton />
         </div>
         </header>;
}

export default Header;