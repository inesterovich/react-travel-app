import React from "react";
import Logo from "../components/Logo";
import Search from "../components/Search";
import Registration from "../components/Registration";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { Container } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Container maxWidth="xl">
        <Toolbar className={styles.header_toolbar}>
          <Logo />
          {location.pathname === "/" && <Search />}
          <Registration />
        </Toolbar>
      </Container>
    </header>
  );
};
export default Header;
