import React from 'react';
import styles from './styles.module.css';

const MapCountry: React.FC = React.memo(() => {
  return (
    <div className={styles.mapCountry}>
      карту страны на которой маркером отмечена её столица
    </div>
  );
});
export default MapCountry;
