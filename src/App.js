import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";

import mapStyles from "./mapStyles.js";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const center = {
  lat: 41.179192,
  lng: -73.189484
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const APIKEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export default function App() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: APIKEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <h1>
        tDN's BridgeMap {''}<span role="img" aria-label="crown">🗺️</span></h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={options}
        onClick={(event) => {
          setMarkers(current => [
            ...current,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            },
          ]);
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </div>
  );

}
