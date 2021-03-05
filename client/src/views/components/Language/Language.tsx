import React from 'react';
import styles from './styles.module.css';

const Language: React.FC = () => {
  return (
    <div className={styles.language}>
      <select>
        <option>Русский</option>
        <option>English</option>
        <option>Other</option>
      </select>
    </div>
  );
};
export default Language;
