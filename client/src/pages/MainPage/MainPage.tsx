import React, { useEffect, useCallback } from "react";
import { CircularProgress, Fade } from "@material-ui/core";
import CountryCard from "../../views/components/CountryCard/index";
import { v4 as uuidv4 } from "uuid";
import { ICountry } from "../../types";
import {
  actionSetCurrentCountry,
  getCountriesThunk,
} from "../../redux/countries";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import styles from "./styles.module.css";
interface IProps {
  countries: {
    data: Array<ICountry> | [];
    isLoading?: boolean;
    error: string | null;
  };
}

const MainPage: React.FC = () => {
  const countries = useSelector((state: IProps) => state.countries || []);
  console.log(countries);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!countries.data.length) dispatch(getCountriesThunk());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickCard = useCallback(
    (el) => {
      dispatch(actionSetCurrentCountry(el));
    },
    [dispatch]
  );

  return (
    <div className={styles.mainPage}>
      {countries.isLoading ? (
        <div className="center_block">
          <CircularProgress />
        </div>
      ) : (
        <Fade in={true} timeout={700}>
          <>
            <Alert severity="success">
              Hi) Я скрытый текст — <strong>Только для избранных!</strong>
            </Alert>
            <div className="intro_text">
              <h1>Top Destination</h1>
              <p>
                Feel the love—these iconic, can’t-miss destinations are always
                at the top of travelers’ wish lists.
              </p>
            </div>
            <div className="flex-wrap">
              {countries.data.map((el: ICountry) => (
                <div
                  className="flex-wrap__item"
                  key={uuidv4()}
                  onClick={() => handleClickCard(el)}
                >
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
