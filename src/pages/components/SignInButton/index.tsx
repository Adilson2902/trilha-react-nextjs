import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss'

const SignInButton: React.FC = () => {
  const isUserLogged = true;

  return isUserLogged ? 
        (<button type='button' className={styles.signInButton}>
            <FaGithub color='#04d361'/>
            Adilson Adriano 
            <FiX color='#737380' className={styles.closeIcon} />
        </button>) :  
        (<button type='button' className={styles.signInButton}>
            <FaGithub color='#eba417'/>
            Sign in with Github
        </button>)  ;
}

export default SignInButton;