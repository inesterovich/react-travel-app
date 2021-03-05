import React from 'react';
import styles from './styles.module.css';

type Props = {
  onClick?: () => void;
  buttonName: string;
  typeBtn: 'button' | 'submit' | 'reset';
};

const Button: React.FC<Props> = React.memo(({ buttonName, onClick, typeBtn }) => {
  return (
    <button className={styles.btn} onClick={onClick} type={typeBtn}>
      {buttonName}
    </button>
  );
});

export default Button;
