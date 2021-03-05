import React from 'react';
import styles from './styles.module.css';

const Currency: React.FC = React.memo(() => {
  return (
    <div className={styles.currency}>
      курс местной валюты по отношению к доллару, евро, рублю
    </div>
  );
});
export default Currency;
