import React from 'react';
import DescriptionCountry from '../components/DescriptionCountry';
import InfoCountry from '../components/InfoCountry';
import MapCountry from '../components/MapCountry';
import PhotoGallery from '../components/PhotoGallery';
import VideoCountry from '../components/VideoCountry';
import styles from './styles.module.css';

const Content: React.FC = () => {
  return (
    <div className={styles.content}>
      <DescriptionCountry />
      <InfoCountry />
      <MapCountry />
      <PhotoGallery />
      <VideoCountry />
    </div>
  );
};
export default Content;
