import L from "leaflet";

const policeIcon = new L.Icon({
  iconUrl: "/icons8-police-48.png",
  iconSize: [48, 48], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76],
});

export default policeIcon;
