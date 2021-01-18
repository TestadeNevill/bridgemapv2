import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const center = {
  lat: 41.179192,
  lng: -73.189484
};

const APIKEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export default function App() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: APIKEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
      ></GoogleMap>
    </div>
  );

}
