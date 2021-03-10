import React, { useEffect } from "react";
import styles from "./styles.module.css";

import { Fade } from "@material-ui/core";
import CountryCard from "../../views/components/CountryCard/index";
import { v4 as uuidv4 } from "uuid";

import { ICountry } from "../../types";

import { getCountriesThunk } from "../../redux/countries";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../redux/rootReducer";

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
  const search = useSelector((state:RootState) => state.countries.search)
  useEffect(() => {
    if (!countries.data.length) dispatch(getCountriesThunk());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={styles.mainPage}>
      {countries.isLoading ? (
        "Loading ........"
      ) : (
        <Fade in={true} timeout={700}>
          <div className="flex-wrap">
            {countries.data.filter((e)=> e.name.toLowerCase().includes(search.trim().toLowerCase())).map((el: ICountry) => (
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
