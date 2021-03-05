import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SEARCH } from '../../reducers/typesReducer';
import SearchIcon from '../../assets/img/search.png';
import styles from './styles.module.css';

const Search: React.FC = () => {
  const [valueInput, setValueInput] = useState('');
  const dispatch = useDispatch();

  const handleKeyUpInput = useCallback((event) => {
    setValueInput(event.target.value);
  }, []);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        dispatch({ type: SEARCH, payload: valueInput });
      }
    },
    [valueInput, dispatch]
  );
  const handleFindClick = useCallback(() => {
    dispatch({ type: SEARCH, payload: valueInput });
  }, [dispatch, valueInput]);

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueInput(event.target.value);
    },
    []
  );

  return (
    <div className={styles.search}>
      <div className={styles.inputWrapper} data-text={valueInput}>
        <input
          value={valueInput}
          className={styles.inputSearch}
          type='text'
          placeholder='Find country…'
          onKeyUp={handleKeyUpInput}
          onKeyPress={handleKeyPress}
          onChange={handleChangeInput}
        />
      </div>
      <div className={styles.searchIconWrapper}>
        <img
          className={styles.searchIcon}
          src={SearchIcon}
          alt='search'
          onClick={handleFindClick}
        />
      </div>
    </div>
  );
};
export default Search;
