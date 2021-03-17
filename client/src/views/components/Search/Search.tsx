import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import SearchBar from "material-ui-search-bar";
import { useDispatch, useSelector } from "react-redux";
import { actionSetSearch } from "../../../redux/countries";
import { RootState } from "../../../redux/rootReducer";
import { Lang, typeLocalization } from "../../../types";

const textSearch: typeLocalization = {
  [Lang.Ru]: "Поиск",
  [Lang.En]: "Search",
  [Lang.Es]: "Buscar",
};

const Search: React.FC = React.memo(() => {
  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.countries.search);

  const searchRef = useRef(null);

  useEffect(() => {
    //@ts-ignore
    searchRef.current && searchRef.current.focus();
  }, [searchRef]);
  const handleChange = (e: string) => {
    dispatch(actionSetSearch(e));
  };
  const handleClean = () => {
    dispatch(actionSetSearch(""));
  };

  return (
    <SearchBar
      onChange={handleChange}
      value={search}
      placeholder={`${textSearch[currentLanguage as Lang]}`}
      className={styles.search}
      onCancelSearch={handleClean}
      //@ts-ignore
      ref={searchRef}
    />
  );
});
export default Search;
