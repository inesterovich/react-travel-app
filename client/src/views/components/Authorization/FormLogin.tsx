import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./styles.module.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog } from "@material-ui/core";
import { Link } from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";

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
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.dialog}>
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField
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
              <a href="#" onClick={handleRegisterOpen}>
                Регистрация
              </a>
            </div>
            <Button
              type="submit"
              variant="outlined"
              color="primary" /* disabled={!formState.isValid} */
            >
              Submit
            </Button>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  );
};

export default FormLogin;
