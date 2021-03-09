import React, { useEffect } from "react";
import styles from "./styles.module.css";

import { Fade } from "@material-ui/core";
import CountryCard from "../../views/components/CountryCard/index";
import { v4 as uuidv4 } from "uuid";

import { ICountry } from "../../types";

import { getCountriesThunk } from "../../redux/countries";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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
    axios
      .post("/api/service/countries")
      .then(function (response) {
        console.log("Resp = ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch("/api/service/countries", {
      method: "POST",
      body: null,
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!countries.data.length) dispatch(getCountriesThunk());
  }, []);

  return (
    <div className={styles.mainPage}>
      {countries.isLoading ? (
        "loading ........"
      ) : (
        <Fade in={true} timeout={700}>
          <div className="flex-wrap">
            {countries.data.map((el: ICountry) => (
              <div className="flex-wrap__item" key={uuidv4()}>
                <CountryCard name={el.name} snippet={el.snippet} />
              </div>
            ))}
          </div>
        </Fade>
      )}
    </div>
  );
};

export default MainPage;
