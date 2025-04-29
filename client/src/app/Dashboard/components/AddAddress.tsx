import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import L from "leaflet";

// Fix Leaflet's default icon (required for markers)
delete (L.Icon.Default.prototype as any)._getIconUrl; 
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Isolated Map Component for Context Consumer isolation
const IsolatedMap = (position: any) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Baneshwor, Kathmandu</Popup>
      </Marker>
    </MapContainer>
  );
};

const MapComponent = () => {
  const position = [27.7172, 85.324];

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <IsolatedMap position={position} />
    </div>
  );
};

export default MapComponent;
