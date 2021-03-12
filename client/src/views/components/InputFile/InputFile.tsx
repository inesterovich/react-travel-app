import { Avatar, Button } from "@material-ui/core";
import React from "react";
import styles from "./styles.module.css";

const InputFile: React.FC = React.memo(() => {
  const handleChooseFile = () => {
    console.log("choose");
  };

  return (
    <div className={styles.input_file}>
      <Button
        variant="outlined"
        color="secondary"
        component="label"
        onClick={handleChooseFile}
      >
        Upload Image
        <input type="file" hidden accept="image/jpeg,image/png,image/gif" />
      </Button>
      <div className={styles.input_file__avatar}>
        <Avatar
          alt="Remy Sharp"
          className={styles.input_file__avatar}
          src="https://material-ui.com/static/images/avatar/3.jpg"
        />
        <div className={styles.input_file__remove}>×</div>
      </div>
    </div>
  );
});

export default InputFile;
