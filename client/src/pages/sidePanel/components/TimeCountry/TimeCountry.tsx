import React from 'react';
import styles from './styles.module.css';

const TimeCountry: React.FC = React.memo(() => {
  return (
    <div className={styles.timeCountry}>дата и время в столице страны</div>
  );
});
export default TimeCountry;
