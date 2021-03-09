import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import styles from "./styles.module.css";

type State = {
  searchString: string;
};

const MainPage: React.FC = React.memo(() => {
  const searchString = useSelector((state: State) => state.searchString);

  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push("/country");
  }, [history]);

  return (
    <div className={styles.mainPage}>
      <Link to="/country">Main Page</Link>
      <Button onClick={handleClick} typeBtn="button" buttonName="change page" />
    </div>
  );
});
export default MainPage;
