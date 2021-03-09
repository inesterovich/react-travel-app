import React from 'react';
import Currency from '../components/Currency';
import TimeCountry from '../components/TimeCountry';
import Weather from '../components/Weather';
import styles from './styles.module.css';

const SidePanel: React.FC = React.memo(() => {
  return (
    <div className={styles.sidePanel}>
      <Currency />
      <Weather />
      <TimeCountry />
    </div>
  );
});
export default SidePanel;
