import React, { useState } from "react";

import "swiper/swiper-bundle.css";

import { Avatar, Chip } from "@material-ui/core";

import ReactStars from "react-rating-stars-component";

const Votes: React.FC<{ voteId: number }> = React.memo(({ voteId }) => {
  const [value, setValue] = useState<number | null>(2);

  const ratingChanged = (newRating: number | null) => {
    setValue(newRating);
    console.log(newRating);
  };

  return (
    <div className="rating">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />
      <div className="rating__number">{value}</div>
      <div className="rating__number">
        <Chip size="small" avatar={<Avatar>M</Avatar>} label="Ilya" />
        <Chip size="small" avatar={<Avatar>M</Avatar>} label="Max" />
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
