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

import { serverLoginThunk } from "../../../redux/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { Alert } from "@material-ui/lab";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Электронная почта должна иметь правильный формат")
    .required("Email - обязательное поле"),
  password: yup.string().required("Пароль - обязательное поле"),
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
        // dispatch(actionLogout());
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading, isLoggedIn]);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    dispatch(serverLoginThunk(data));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {loginError && <Alert severity="error">{loginError}</Alert>}
      {isLoading && <CircularProgress className="centered" />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${isLoading && "disabled"}`}
        encType="multipart/form-data"
      >
        <div className={styles.dialog}>
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField
              value="dev@dev.ru"
              type="email"
              name="email"
              label="Email *"
              fullWidth
              autoFocus
              inputRef={register}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              value="password"
              type="password"
              name="password"
              label="Password *"
              fullWidth
              inputRef={register}
              error={!!errors.password}
              helperText={errors?.password?.message}
              className="mb_30"
            />
          </DialogContent>
          <DialogActions>
            <div className="question">
              Новый пользователь? <br />
              <div className="link" onClick={handleRegisterOpen}>
                Регистрация
              </div>
            </div>
            <Button type="submit" variant="outlined" color="primary">
              Submit
            </Button>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  );
};

export default FormLogin;
