import React from 'react';
import styles from './styles.module.css';

const DescriptionCountry: React.FC = React.memo(() => {
  return (
    <div className={styles.descriptionCountry}>
      фото страны, название страны, название её столицы
    </div>
  );
});
export default DescriptionCountry;
