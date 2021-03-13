import React from "react";
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar, IconButton } from "@material-ui/core";

import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";

const Registration: React.FC = React.memo(() => {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const handleClose = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };

  return (
    <div className={`${styles.registration} registration`}>
      <IconButton>
        <AccountCircleIcon />
      </IconButton>
      <IconButton>
        <Avatar
          alt=""
          className="Avatar"
          src="https://material-ui.com/static/images/avatar/3.jpg"
        />
      </IconButton>

      <Button onClick={handleRegisterOpen}>Login/Register</Button>

      <FormLogin
        open={loginOpen}
        handleClose={handleClose}
        handleRegisterOpen={handleRegisterOpen}
      />
      <FormRegister
        open={registerOpen}
        handleClose={handleClose}
        handleLoginOpen={handleLoginOpen}
      />
    </div>
  );
});

export default Registration;
