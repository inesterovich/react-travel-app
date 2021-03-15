import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputFile from "../InputFile/index";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress, Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { serverRegisterThunk } from "../../../redux/registration/thunks";
import { RootState } from "../../../redux/rootReducer";
import { Alert } from "@material-ui/lab";
import { actionRemoveErrorMessage } from "../../../redux/auth";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Электронная почта должна иметь правильный формат")
    .required("Email - обязательное поле"),
  password: yup
    .string()
    .required("Пароль - обязательное поле")
    .min(6, "Минимум 6 символов"),
  name: yup.string().required("Имя - обязательное поле"),
});

const FormRegister: React.FC<{
  open: boolean;
  handleClose: () => void;
  handleLoginOpen: () => void;
}> = ({ open, handleClose, handleLoginOpen }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputFileErr, setInputFileErr] = useState<boolean>(false);

  const loginError = useSelector((state: RootState) => state.auth.error);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const isAvatarLoaded = useSelector(
    (state: RootState) => state.registration.avatar
  );

  useEffect(() => {
    if (isAvatarLoaded) setInputFileErr(false);
  }, [isAvatarLoaded]);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoading && !isLoggedIn) {
      setTimeout(() => {
        setIsLoading(false);
        dispatch(actionRemoveErrorMessage());
      }, 3000);
    }
  }, [isLoading, isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data: any) => {
    if (!data.avatar.length) {
      setInputFileErr(true);
      return;
    }
    setInputFileErr(false);
    setIsLoading(true);
    dispatch(serverRegisterThunk(data));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      {isLoading && <CircularProgress className="centered" />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        // encType="multipart/form-data"
        className={`${isLoading && "disabled"}`}
      >
        <div className={styles.dialog}>
          {loginError && <Alert severity="error">{loginError}</Alert>}
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <TextField
              value="Elmira"
              type="text"
              name="name"
              label="Name *"
              fullWidth
              autoFocus
              inputRef={register}
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
            <TextField
              // value="t@gmail.ru"
              type="email"
              name="email"
              label="Email *"
              fullWidth
              inputRef={register}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              value="123456"
              type="password"
              name="password"
              label="Password *"
              fullWidth
              inputRef={register}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <InputFile register={register} />
            {inputFileErr && !isAvatarLoaded && (
              <div className="error error--input_file">Avatar is required</div>
            )}
          </DialogContent>
          <DialogActions>
            <div className="question">
              Уже зарегистрированы?
              <br />
              <div className="link" onClick={handleLoginOpen}>
                Войти
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

export default FormRegister;
