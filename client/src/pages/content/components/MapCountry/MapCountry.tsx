import React from 'react';
import styles from './styles.module.css';
import Map from "../../../../views/components/Map";

const MapCountry: React.FC = React.memo(() => {
  return (
    <div className={styles.mapCountry}>
      <Map />
    </div>
  );
});
export default MapCountry;
