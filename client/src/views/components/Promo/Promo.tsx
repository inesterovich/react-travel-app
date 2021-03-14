import { Container, Fade } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import styles from "./styles.module.css";

enum Lang {
  Ru = "ru",
  Es = "es",
  En = "en",
}

type PromoDescription = {
  [key in Lang]?: string;
};

const textPromo1: PromoDescription = {
  [Lang.Ru]: "Откройте для себя",
  [Lang.En]: "Explore the",
  [Lang.Es]: "Explore la ",
};

const textPromo2: PromoDescription = {
  [Lang.Ru]: "Красоту",
  [Lang.En]: "Beauty of the",
  [Lang.Es]: "Belleza del",
};

const textPromo3: PromoDescription = {
  [Lang.Ru]: "Прекрасного мира",
  [Lang.En]: "Beautiful World",
  [Lang.Es]: "Hermoso mundo",
};

const CountryCard: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  return (
    <Fade in={true} timeout={1800}>
      <div className={styles.promo}>
        <Container maxWidth="xl">
          <div className={styles.promo__title}>
            {textPromo1[currentLanguage as Lang]} <br />
            {textPromo2[currentLanguage as Lang]} <br />
            {textPromo3[currentLanguage as Lang]}
          </div>
        </Container>
      </div>
    </Fade>
  );
};

export default CountryCard;
