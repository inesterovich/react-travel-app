import React from "react";
import Logo from "../components/Logo";
import Search from "../components/Search";
import Registration from "../components/Authorization";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { Container } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Language from "../components/Language/Language";

const Header: React.FC = React.memo(() => {
  const location = useLocation();

  return (
    <header
      className={`${styles.header} ${
        location.pathname === "/" ? "" : "header--inner"
      }`}
    >
      <Container maxWidth="xl">
        <Toolbar className={styles.header_toolbar}>
          <Logo />
          {location.pathname === "/" && <Search />}
          <Registration />
          <Language />
        </Toolbar>
      </Container>
    </header>
  );
});
export default Header;
