import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../scss/Map.scss";

const center = {
  lat: 59.330894223871915,
  lng: 17.984108157670534,
};
const MapComponent: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDR5Iu-Xt-jS_GPSTctbksbrD_f6JcTfog">
      <GoogleMap
        center={center}
        zoom={16}
        mapContainerClassName="map-container"
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
