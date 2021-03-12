import React from "react";
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar, IconButton } from "@material-ui/core";
import InputFile from "../InputFile/index";

const RegisterLayout: React.FC = () => {
  return (
    <div className="dialog">
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="Email"
          type="email"
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          className="mb_50"
        />
        <InputFile />
      </DialogContent>
    </div>
  );
};

const LoginLayout: React.FC = () => {
  return (
    <div className="dialog">
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email"
          type="email"
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          className="mb_50"
        />
      </DialogContent>
    </div>
  );
};

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
          alt="Remy Sharp"
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
        {register ? <LoginLayout /> : <RegisterLayout />}

        <DialogActions>
          <Button onClick={handleRegister} color="primary">
            {register ? "Register" : "Login"}
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default Registration;
