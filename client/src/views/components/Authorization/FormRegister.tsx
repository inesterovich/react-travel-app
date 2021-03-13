import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputFile from "../InputFile/index";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Электронная почта должна иметь правильный формат")
    .required("Email - обязательное поле"),
  password: yup.string().required("Пароль - обязательное поле"),
  name: yup.string().required("Имя - обязательное поле"),
});

const FormRegister: React.FC = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="dialog">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <TextField
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
            type="email"
            name="email"
            label="Email *"
            fullWidth
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
          />
          <InputFile />
        </DialogContent>
        <DialogActions>
          <div className="question">
            Уже зарегистрированы?
            <br />
            <Link to="/login/">Войти</Link>
          </div>
          <Button
            type="submit"
            variant="outlined"
            color="primary" /* disabled={!formState.isValid} */
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default FormRegister;
