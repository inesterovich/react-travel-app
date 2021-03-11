import React from "react";
import { Typography } from "@material-ui/core";

const VideoCountry: React.FC = React.memo(() => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Видео о стране
      </Typography>
      <iframe
        width="100%"
        height="400"
        src="https://www.youtube.com/embed/8TpBg6D5OsQ"
        title="Доминикана"
        // @ts-ignore
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
});
export default VideoCountry;
