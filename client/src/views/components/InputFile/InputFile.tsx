import { Avatar, Button, Fade } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { actionSetAvatar } from "../../../redux/registration/actions";
import { Lang } from "../../../types";
import { textAvatarButton } from "../../../localizations";
import { RootState } from "../../../redux/rootReducer";

const InputFile: React.FC<{
  register: any;
}> = React.memo(({ register }) => {
  const [avatarUrl, setAvatarUrl] = useState(undefined);
  const [updateFile, setUpdateFile] = useState(false);

  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  useEffect(() => {
    setUpdateFile(true);
    setAvatarUrl(undefined);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUpdateFile(true);
  }, [updateFile]);

  useEffect(() => {
    dispatch(actionSetAvatar(avatarUrl));
  }, [avatarUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFile = (e: any) => {
    setAvatarUrl(e.target.result);
  };

  const dispatch = useDispatch();

  const handleChangeFile = (e: React.ChangeEvent) => {
    const input = e.target as HTMLInputElement;

    if (!input.files?.length) {
      setAvatarUrl(undefined);
      return;
    }

    setUpdateFile(true);
    const fileData = new FileReader();
    fileData.onloadend = handleFile;
    const file = input.files[0];
    fileData.readAsDataURL(file);
  };

  const handleClickCancel = () => {
    setUpdateFile(false);
    setAvatarUrl(undefined);
  };

  return (
    <div className={styles.input_file}>
      {updateFile && (
        <input
          autoComplete="off"
          id="avatar"
          type="file"
          name="avatar"
          style={{ display: "none" }}
          accept="image/jpeg,image/png,image/gif"
          onChange={handleChangeFile}
          ref={register}
        />
      )}

      <label htmlFor="avatar">
        <Button variant="outlined" component="span" color="secondary">
          {`${textAvatarButton[currentLanguage as Lang]} *`}
        </Button>
      </label>

      {avatarUrl && (
        <Fade in={true} timeout={400}>
          <div className={styles.input_file__avatar}>
            <Avatar
              className={styles.input_file__avatar__img}
              src={avatarUrl}
            />
            <div
              className={styles.input_file__remove}
              onClick={handleClickCancel}
            >
              ×
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
});

export default InputFile;
