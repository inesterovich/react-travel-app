import { Avatar, Button, Fade } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const InputFile: React.FC = React.memo(() => {
  const [avatarUrl, setAvatarUrl] = useState(undefined);
  const [updateFile, setUpdateFile] = useState(false);

  useEffect(() => {
    setUpdateFile(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUpdateFile(true);
  }, [updateFile]);

  const handleFile = (e: any) => {
    setAvatarUrl(e.target.result);
  };

  const handleChangeFile = (e: React.ChangeEvent) => {
    const input = e.target as HTMLInputElement;

    if (!input.files?.length) {
      setAvatarUrl(undefined);
      return;
    }

    const file = input.files[0];
    setUpdateFile(true);
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
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
          id="avatar"
          type="file"
          name="avatar"
          style={{ display: "none" }}
          accept="image/jpeg,image/png,image/gif"
          onChange={handleChangeFile}
        />
      )}

      <label htmlFor="avatar">
        <Button variant="outlined" component="span" color="secondary">
          Upload AVATAR
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
