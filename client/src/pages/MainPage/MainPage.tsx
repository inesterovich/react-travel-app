import React, { useCallback, useEffect } from "react";
import { CircularProgress, Fade } from "@material-ui/core";
import CountryCard from "../../views/components/CountryCard/index";
import { v4 as uuidv4 } from "uuid";

import { ICountry } from "../../types";
import {
  actionSetCurrentCountry,
  getCountriesThunk,
} from "../../redux/countries";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import styles from "./styles.module.css";
import { getAuthCountriesThunk } from "../../redux/countries/thunks";
export interface IProps {
  countries: {
    data: Array<ICountry> | [];
    isLoading?: boolean;
    error: string | null;
  };
}

const MainPage: React.FC<{}> = () => {
  const countries = useSelector((state: IProps) => state.countries || []);
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.countries?.search);
  const currentLanguage = useSelector(
    (state: RootState) => state.countries?.currentLanguage
  );

  const isLoggedIn = useSelector((state: RootState) => state.auth?.isLoggedIn);

  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountriesThunk());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAuthCountriesThunk());
    }
  }, [isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickCard = useCallback(
    (el) => {
      dispatch(actionSetCurrentCountry(el));
    },
    [dispatch]
  );

  return (
    <div className={styles.mainPage}>
      {countries.isLoading ? (
        <div className="center_block" id={"center_block"}>
          <CircularProgress />
        </div>
      ) : (
        <Fade in={true} timeout={700}>
          <div className="flex-wrap" id="flex-wrap">
            {countries?.data
              ?.filter(
                (e) =>
                  e[`${currentLanguage}`].name
                    ?.toLowerCase()
                    .includes(search.trim().toLowerCase()) ||
                  e[`${currentLanguage}`].capital?.name
                    ?.toLowerCase()
                    .includes(search.trim().toLowerCase())
              )
              .map((el: ICountry) => (
                <div
                  className="flex-wrap__item"
                  key={uuidv4()}
                  onClick={() => handleClickCard(el)}
                  id={"countryCard"}
                >
                  <CountryCard
                    name={el[`${currentLanguage}`].name}
                    description={el[`${currentLanguage}`].description}
                    image={el[`${currentLanguage}`].image}
                    capital={el[`${currentLanguage}`].capital}
                  />
                </div>
              ))}
          </div>
        </Fade>
      )}
    </div>
  );
};

export default MainPage;
