import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";

import { Avatar, IconButton, Tooltip } from "@material-ui/core";

import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import { RootState } from "../../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { actionLogout } from "../../../redux/auth";

const Registration: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const avatarUrl = useSelector(
    (state: RootState) => state.registration.avatar
  );

  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

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
      {isLoggedIn ? (
        <IconButton onClick={onLogOut}>
          <Tooltip title="Logout" interactive>
            <Avatar
              alt=""
              className="Avatar"
              src={avatarUrl}
              // src=""
            />
          </Tooltip>
        </IconButton>
      ) : (
        <Button onClick={handleRegisterOpen}>Login</Button>
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
