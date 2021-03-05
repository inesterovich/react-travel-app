import React from 'react';
import Language from '../components/Language';
import Logo from '../components/Logo';
import Registration from '../components/Registration';
import styles from './styles.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Logo />
      <Language />
      <Registration />
    </div>
  );
};
export default Header;
