import React, { useEffect } from "react";
import styles from "./styles.module.css";

import { Fade } from "@material-ui/core";
import CountryCard from "../../views/components/CountryCard/index";
import { v4 as uuidv4 } from "uuid";

import { ICountry } from "../../types";

import { getCountriesThunk } from "../../redux/countries";
import { useDispatch, useSelector } from "react-redux";

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

  useEffect(() => {
    if (!countries.data.length) dispatch(getCountriesThunk());
  }, []);

  return (
    <div className={styles.mainPage}>
      {countries.isLoading ? (
        "Loading ........"
      ) : (
        <Fade in={true} timeout={700}>
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
        </Fade>
      )}
    </div>
  );
};

export default MainPage;
