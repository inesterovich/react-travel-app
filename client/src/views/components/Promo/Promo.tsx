import { Container, Fade } from "@material-ui/core";
import React from "react";
import styles from "./styles.module.css";

const CountryCard: React.FC = () => (
  <Fade in={true} timeout={1800}>
    <div className={styles.promo}>
      <Container maxWidth="xl">
        <div className={styles.promo__title}>
          Explore the <br />
          Beauty of the <br />
          Beautiful World
        </div>
      </Container>
    </div>
  </Fade>
);

export default CountryCard;
