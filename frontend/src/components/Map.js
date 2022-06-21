import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import policeIcon from "../icons/PoliceIcon";
const Map = () => {
  const position = [27.7475809, 85.3052357];

  //   const addGeoJSON = (data) => {
  //     if (!data) return;

  //     const policeGeoJSON = new L.GeoJSON(data, {
  //       onEachFeature: (feature = {}, layer) => {},
  //     });
  //   };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((response) => console.log("response ->", response));
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "calc(100vh - 60px)", width: "50%" }}
    >
      <TileLayer
        attribution=' &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV1c2x5IiwiYSI6ImNrcjducHI3YTNueWwydXFodWV6OXZlY3oifQ.tvR8zkkC6ClxjdWfyH4TRQ"
        maxZoom={20}
      />
      <Marker position={position} icon={policeIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
