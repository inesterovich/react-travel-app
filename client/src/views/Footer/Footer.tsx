import React from "react";
import styles from "./styles.module.css";
import { Container, IconButton } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import logoSrc from "./rs_school_js.svg";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="xl">
        <Toolbar className={styles.footer__toolbar}>
          <div className={styles.footer__githubs}>
            <IconButton href="https://github.com/inesterovich" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton href="https://github.com/ReaZzy" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton href="https://github.com/TimraWork" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://github.com/kostyayakimovich"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
          </div>
          <div className={styles.footer__meta}>
            <div className={styles.footer__copyright}>&copy; 2021</div>
            <div className={styles.footer__youtube}>
              <IconButton href="https://www.youtube.com/" target="_blank">
                <YouTubeIcon />
              </IconButton>
            </div>
          </div>

          <a
            href={"https://rs.school/react/"}
            className={styles.footer__logo}
            target="_blank"
            rel="noreferrer"
          >
            <img src={logoSrc} alt="" />
          </a>
        </Toolbar>
      </Container>
    </footer>
  );
};
export default Footer;
