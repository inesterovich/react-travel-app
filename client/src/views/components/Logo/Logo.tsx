import logoSrc from "./logo.png";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Logo: React.FC = () => (
  <Link to="/" className={styles.logo}>
    <img src={logoSrc} alt="" />
  </Link>
);

export default Logo;
