import React from 'react';
import styles from './styles.module.css';

const VideoCountry: React.FC = React.memo(() => {
  return (
    <div className={styles.videoCountry}>
      видео о стране или её достопримечательностях
    </div>
  );
});
export default VideoCountry;
