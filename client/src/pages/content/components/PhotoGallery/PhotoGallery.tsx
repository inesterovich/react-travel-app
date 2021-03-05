import React from 'react';
import styles from './styles.module.css';

const PhotoGallery: React.FC = () => {
  return (
    <div className={styles.photoGallery}>
      фотогалерею достопримечательностей страны (не меньше шести) с названием и
      небольшим описанием каждой из них
    </div>
  );
};
export default PhotoGallery;
