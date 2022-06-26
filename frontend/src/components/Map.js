import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer,  GeoJSON } from "react-leaflet";
import "leaflet-boundary-canvas";
import data from "../data.json"
const Map = (props) => {
  const [position,setPosition] = useState(
    JSON.stringify([27.7475809, 85.3052357])
  );

  const maxBounds = [
    [26.3477581, 80.0586226],
    [30.446945, 88.2015257],
  ];

  // const setPositionInMap = (latLong) => {
  //   setPosition(latLong);
  //   const parsedLocation = JSON.parse(latLong);
  //   console.log("parsed location", parsedLocation);
  //   props.setLatAndLong(parsedLocation[0], parsedLocation[1]);
  // };

  // const onDragEnd = (event) => {
  //   console.log("event", event);
  //   const marker = event.target;
  //   const latLong = marker.getLatLng();
  //   setPosition(JSON.stringify([latLong.lat, latLong.lng]));
  //   props.setLatAndLong(latLong.lat, latLong.lng);
  // };

  const style = () => {
    return  {
      fillColor: "#E3E3E3",
      weight: 1,
      opacity: 0.4,
      color: 'red',
      fillOpacity: 0.3
  }}
  return (
    <>
      <MapContainer
        center={JSON.parse(position)}
        zoom={13}
        scrollWheelZoom={true}
        maxBounds={maxBounds}
        maxZoom={6}
        style={{ height: "calc(100vh - 60px)", width: "100%" }}
      >
        <TileLayer
          attribution=' &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV1c2x5IiwiYSI6ImNrcjducHI3YTNueWwydXFodWV6OXZlY3oifQ.tvR8zkkC6ClxjdWfyH4TRQ"
        />
        <GeoJSON data={data} style={style}/>
        {/* {props.isDraggable ? (
          <>
            <Marker
              position={JSON.parse(position)}
              draggable={props.isDraggable}
              eventHandlers={{ dragend: onDragEnd }}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <chakra.div
              position="absolute"
              top="0"
              zIndex="1200"
              bgColor="white"
              right="0"
              mr={3}
              borderRadius="md"
              mt={2}
            >
              <Search setPosition={setPositionInMap} />{" "}
            </chakra.div>
          </>
        ) : (
          props.children
        )} */}
      </MapContainer>
    </>
  );
};

export default Map;
