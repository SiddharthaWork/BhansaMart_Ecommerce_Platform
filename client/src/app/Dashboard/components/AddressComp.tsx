// MapComponent.tsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../../context/AppContext";

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

const MapClickHandler: React.FC<{
  onMapClick: (latlng: [number, number]) => void;
}> = ({ onMapClick }) => {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      onMapClick([lat, lng]);
    };

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onMapClick]);

  return null;
};

const MapCenterHandler: React.FC<MapProps> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
};

type MapProps = {
  position: any;
  popupText?: string;
  onMapClick?: (latlng: [number, number]) => void;
};

const IsolatedMap: React.FC<MapProps> = ({
  position,
  popupText,
  onMapClick,
}) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{popupText}</Popup>
      </Marker>
      <MapCenterHandler position={position} />
      {onMapClick && <MapClickHandler onMapClick={onMapClick} />}
    </MapContainer>
  );
};

const MapComponent = () => {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState([27.7172, 85.324]);
  const [popupText, setPopupText] = useState("Baneshwor, Kathmandu");

  const navigate = useNavigate();

  const { setLocation } = useAppData();

  // Search for a location by name
  const searchLocation = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
        setPopupText(display_name);
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchLocation();
    }
  };

  // When a location on the map is clicked, reverse geocode it and navigate back.
  const handleMapClick = async (latlng: [number, number]) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng[0]}&lon=${latlng[1]}`
      );

      console.log(response);
      if (response.data) {
        setPosition(latlng);
        setPopupText(response.data.display_name);

        setLocation({
          coordinates: latlng,
        });

        navigate(-1);

        // Navigate explicitly back to the checkout page with the selected address
        // if (fromCheckout) {
        //   navigate("/checkout", {
        //     state: { selectedAddress: latlng },
        //   });
        // }
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      alert("Could not get address for this location");
    }
  };

  return (
    <div className="mt-20">
      <h2 className="font-bold my-2">Add New Address</h2>
      <div className="mb-4">
        <div className="flex items-center gap-2 px-3 py-2 my-3 text-sm shadow-md border-gray-200 border-[1px] rounded-md">
          <button onClick={searchLocation}>
            <span className="text-lg text-[#2c5f2d]">
              <Icon icon="mynaui:search" />
            </span>
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for new area, street name..."
            className="w-full focus:outline-none"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="h-[400px] w-full">
          <IsolatedMap
            position={position}
            popupText={popupText}
            onMapClick={handleMapClick}
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold py-1">Deliver your order to</h3>
        <div className="flex justify-between items-center gap-14">
          <div className="flex items-center justify-between px-3 bg-[#f4fce9] py-3 border-gray-100 border-2 rounded-md flex-1">
            <div className="flex gap-2">
              <span>
                <Icon icon="weui:location-outlined" height={40} width={40} />
              </span>
              <span>
                <p>{popupText}</p>
              </span>
            </div>
            <button className="bg-white px-3 py-1 rounded-md text-sm font-semibold text-[#2c5f2d] border-gray-200 border-[1px]">
              Change
            </button>
          </div>
          <button className="flex items-center font-semibold text-[#fcfcfc] bg-[#024756] px-1 pl-2 h-10 rounded-md">
            Add more address details
            <span>
              <Icon icon="ic:twotone-arrow-right" height={30} width={30} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
