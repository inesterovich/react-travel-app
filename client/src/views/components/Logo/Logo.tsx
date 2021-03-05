import React from 'react';

import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Logo: React.FC = () => {
  return (
    <>
      <Link to='/' className={styles.logo}>
        Logo
      </Link>
    </>
  );
};
export default Logo;
