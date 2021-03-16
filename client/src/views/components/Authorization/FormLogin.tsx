import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./styles.module.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress, Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import {
  textRegisterhLink,
  textLogin,
  textRegister,
  textSubmit,
  textEmail,
  textPassword,
} from "../../../localizations";

import {
  actionRemoveErrorMessage,
  serverLoginThunk,
} from "../../../redux/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { Alert } from "@material-ui/lab";
import { Lang } from "../../../types";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be in the correct format")
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Minimum 6 characters"),
});

const FormLogin: React.FC<{
  open: boolean;
  handleClose: () => void;
  handleRegisterOpen: () => void;
}> = ({ open, handleClose, handleRegisterOpen }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loginError = useSelector((state: RootState) => state.auth.error);
  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  useEffect(() => {
    if (loginError) {
      setIsLoading(false);
    }
  }, [loginError]);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoading && !isLoggedIn) {
      setTimeout(() => {
        dispatch(actionRemoveErrorMessage());
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading, isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data: any) => {
    setIsLoading(true);
    dispatch(serverLoginThunk(data));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {isLoading && <CircularProgress className="centered" />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${isLoading && "disabled"}`}
        encType="multipart/form-data"
      >
        <div className={styles.dialog}>
          {loginError && <Alert severity="error">{loginError}</Alert>}
          <DialogTitle id="form-dialog-title">
            {textLogin[currentLanguage as Lang]}
          </DialogTitle>
          <DialogContent>
            <TextField
              type="email"
              name="email"
              label={`${textEmail[currentLanguage as Lang]} *`}
              fullWidth
              autoFocus
              inputRef={register}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              type="password"
              name="password"
              label={`${textPassword[currentLanguage as Lang]} *`}
              fullWidth
              inputRef={register}
              error={!!errors.password}
              helperText={errors?.password?.message}
              className="mb_30"
            />
          </DialogContent>
          <DialogActions>
            <div className="question">
              {textRegisterhLink[currentLanguage as Lang]} <br />
              <div className="link" onClick={handleRegisterOpen}>
                {textRegister[currentLanguage as Lang]}
              </div>
            </div>
            <Button type="submit" variant="outlined" color="primary">
              {textSubmit[currentLanguage as Lang]}
            </Button>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  );
};

export default FormLogin;
