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
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loginError = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if (loginError) {
      setIsLoading(false);
    }
  }, [loginError]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

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
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField
              value="test@test.com"
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
              value="123123"
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
