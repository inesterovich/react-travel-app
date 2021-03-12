import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, GeoJSON} from "react-leaflet";
import data from "./data/countries.json"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import styles from "./styles.module.css"
import {RootState} from "../../../redux/rootReducer";

const Map: React.FC<{}> = () => {
  const currentLanguage = useSelector((state: RootState) => state.countries.currentLanguage)
  const [mapInfo] = useState<any>(data)
  const accessToken = "pk.eyJ1IjoidHJhdmVsYXBwcnMiLCJhIjoiY2tseTc0c2dpMHdxMjJ1cnp3bjJtamY0dyJ9.zreWl48n6xr29TsuSx0ApA"
  const {id} = useParams<{ id: string }>()
  const countryBorders = mapInfo.features.findIndex((e: any) => e.properties.sovereignt === id)

  return (
    <>
      <MapContainer fullscreenControl={true}
                    center={countryBorders >= 0 ? mapInfo.features[countryBorders].properties.capitalCoords : [0, 0]}
                    zoom={6} className={styles.map}>
        {currentLanguage === "ru" &&
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/travelapprs/cklyvkn451nfo17o8kb93owrf/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
        />
        }
        {currentLanguage === "en" &&
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/travelapprs/cklywb0ka53p417ryzg4bag5v/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
        />
        }
        {currentLanguage === "es" &&
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/travelapprs/cklyweaf77pff17l9c68vbv4k/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
        />
        }
        {countryBorders >= 0 &&
        <>
          <GeoJSON data={mapInfo.features[countryBorders]}/>
          <Marker position={mapInfo.features[countryBorders].properties.capitalCoords}>
            <Popup>
              London
            </Popup>
          </Marker>
        </>
        }
      </MapContainer>
    </>
  )
}

export default Map
