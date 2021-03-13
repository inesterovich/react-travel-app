import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";

import { Avatar, IconButton, Snackbar, Tooltip } from "@material-ui/core";

import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import { RootState } from "../../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { actionLogout } from "../../../redux/auth";
import { Alert } from "@material-ui/lab";

const Registration: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loginError = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if (isLoggedIn) {
      setLoginOpen(false);
      setRegisterOpen(false);
    }
  }, [isLoggedIn]);

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

  const onLogOut = () => {
    dispatch(actionLogout());
  };

  return (
    <div className={`${styles.registration} registration`}>
      {loginError && (
        <Snackbar open={true} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="error">{loginError}</Alert>
        </Snackbar>
      )}
      {isLoggedIn ? (
        <IconButton onClick={onLogOut}>
          <Tooltip title="Logout" interactive>
            <Avatar
              alt=""
              className="Avatar"
              src="https://material-ui.com/static/images/avatar/3.jpg"
              // src=""
            />
          </Tooltip>
          {/* <Popover
            // id={id}
            open={true}
            // anchorEl={anchorEl}
            // onClose={handleClose}
            // anchorOrigin={{
            //   vertical: "bottom",
            //   horizontal: "center",
            // }}
            // transformOrigin={{
            //   vertical: "top",
            //   horizontal: "center",
            // }}
          >
            <Typography>Hi, Elmira</Typography>
          </Popover> */}
        </IconButton>
      ) : (
        <Button onClick={handleLoginOpen}>Login/Register</Button>
      )}

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
