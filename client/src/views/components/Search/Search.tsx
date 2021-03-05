import React from "react";
import styles from "./styles.module.css";
import SearchBar from "material-ui-search-bar";

const Search: React.FC = React.memo(() => (
  <SearchBar
    // value="sdaf"
    // onChange={(newValue) => this.setState({ value: newValue })}
    // onRequestSearch={() => doSomethingWith(this.state.value)}
    className={styles.search}
  />
));
export default Search;
