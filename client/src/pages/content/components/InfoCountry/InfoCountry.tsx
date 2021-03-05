import React from 'react';
import styles from './styles.module.css';

const InfoCountry: React.FC = React.memo(() => {
  return <div className={styles.infoCountry}>краткую информацию о стране</div>;
});
export default InfoCountry;
