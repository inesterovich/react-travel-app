import logoSrc from "./logo.png";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";

const Logo: React.FC = React.memo(() => (
  <Link to="/" className={styles.logo}>
    <img src={logoSrc} alt="" />
  </Link>
));

export default Logo;
