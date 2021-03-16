import React, { useState } from "react";

import "swiper/swiper-bundle.css";
import Rating from "@material-ui/lab/Rating";
import { Avatar, Chip } from "@material-ui/core";

const Votes: React.FC = React.memo(() => {
  const [value, setValue] = useState<number | null>(2);

  return (
    <div className="rating">
      <Rating
        name={`votes`}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <div className="rating__number">{value}</div>
      <div className="rating__number">
        <Chip size="small" avatar={<Avatar>M</Avatar>} label="Ilya" />
        <Chip size="small" avatar={<Avatar>M</Avatar>} label="Max" />
        <Chip size="small" avatar={<Avatar>M</Avatar>} label="Kostya" />
        <Chip size="small" avatar={<Avatar>M</Avatar>} label="Kostya" />
        <Chip size="small" avatar={<Avatar>M</Avatar>} label="Kostya" />
        <Chip size="small" avatar={<Avatar>M</Avatar>} label="Kostya" />
        <Chip
          size="small"
          avatar={
            <Avatar
              alt="Elmira"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
          }
          label="Elmira"
        />
      </div>
    </div>
  );
});
export default Votes;
