import React, { useEffect } from "react";
import styles from "./styles.module.css";

import { CircularProgress, Fade } from "@material-ui/core";
import CountryCard from "../../views/components/CountryCard/index";
import { v4 as uuidv4 } from "uuid";

import { ICountry } from "../../types";

import { getCountriesThunk } from "../../redux/countries";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Alert } from "@material-ui/lab";

interface IProps {
  countries: {
    data: Array<ICountry> | [];
    isLoading?: boolean;
    error: string | null;
  };
}

const MainPage: React.FC = () => {
  const countries = useSelector((state: IProps) => state.countries || []);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!countries.data.length) dispatch(getCountriesThunk());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.mainPage}>
      {isLoggedIn && (
        <Fade in={true} timeout={700}>
          <Alert severity="success">Hi, Elmira</Alert>
        </Fade>
      )}
      {countries.isLoading ? (
        <div className="center_block">
          <CircularProgress />
        </div>
      ) : (
        <Fade in={true} timeout={700}>
          <>
            <div className="intro_text">
              <h1>Top Destination</h1>
              <p>
                Feel the love—these iconic, can’t-miss destinations are always
                at the top of travelers’ wish lists.
              </p>
            </div>
            <div className="flex-wrap">
              {countries.data.map((el: ICountry) => (
                <div className="flex-wrap__item" key={uuidv4()}>
                  <CountryCard
                    name={el.name}
                    description={el.description}
                    image={el.image}
                  />
                </div>
              ))}
            </div>
          </>
        </Fade>
      )}
    </div>
  );
};

export default MainPage;
