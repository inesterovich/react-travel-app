import React from "react";
import styles from "./styles.module.css";
import SearchBar from "material-ui-search-bar";
import {useDispatch, useSelector} from "react-redux";
import {actionSetSearch} from "../../../redux/countries";
import {RootState} from "../../../redux/rootReducer";

const Search: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const search = useSelector((state:RootState) => state.countries.search)
  const handleChange = (e: string) => {
    dispatch(actionSetSearch(e))
  }
  return (
    <SearchBar onChange={handleChange} value={search} className={styles.search}/>
  )
});
export default Search;
