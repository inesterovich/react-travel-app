import React from "react";
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar, IconButton } from "@material-ui/core";

import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";

const Registration: React.FC = React.memo(() => {
  const [open, setOpen] = React.useState(false);
  const [register, setRegiser] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = () => {
    setRegiser(!register);
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

      <Button onClick={handleClickOpen}>Login/Register</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {register ? <FormLogin /> : <FormRegister />}
      </Dialog>
    </div>
  );
});

export default Registration;
