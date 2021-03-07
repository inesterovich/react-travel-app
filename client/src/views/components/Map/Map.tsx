import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, GeoJSON} from "react-leaflet";
import data from "./data/countries.json"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import {useParams} from "react-router-dom";

const Map: React.FC<{}> = () => {
  const [mapInfo] = useState<any>(data)
  const accessToken = "pk.eyJ1IjoidHJhdmVsYXBwcnMiLCJhIjoiY2tseXZxOTZmMWVraDJ2cGxqeW81dnoxbyJ9.iWiRopnKs9YvUXWHSHF_pg"
  const {id} = useParams<{ id: string }>()
  const countryBorders = mapInfo.features.findIndex((e:any) => e.properties.sovereignt === id)
  const [currentLanguage, setCurrentLanguage] = useState("ru")
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentLanguage(e.target.value)
  }
  return (
    <>
      <select onChange={handleChange} value={currentLanguage}>
        <option value={"en"}>En</option>
        <option value={"ru"}>Ru</option>
        <option value={"es"}>Es</option>
      </select>
      <MapContainer fullscreenControl={true} center={ countryBorders >= 0 ? mapInfo.features[countryBorders].properties.capitalCoords : [0, 0]} zoom={2} style={{height: "400px", width: "90%"}}>
        {currentLanguage === "ru" &&
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/travelapprs/cklyvkn451nfo17o8kb93owrf/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
        />
        }
        {currentLanguage === "en" &&
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/travelapprs/cklywb0ka53p417ryzg4bag5v/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
        />
        }
        {currentLanguage === "es" &&
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
