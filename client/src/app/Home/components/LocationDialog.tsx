import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../../context/AppContext";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  addressData: string;
}

interface LocationProps {
  location: string;
  city: string;
  country: string;
}

export const LocationDialog: React.FC<ModalProps> = ({ isOpen, onClose, addressData }) => {
  const [locationData, setLocationData] = useState<LocationProps | null>(null);
  console.log(locationData);

  const { location } = useAppData();

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          alert("Unable to retrieve your location");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await Promise.race([
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        ),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 5000)
        ),
      ]);
      const data = await response.json();
      const address = data.address;

      const road =
        address.road ||
        address.neighbourhood ||
        address.suburb ||
        "Unknown Road";
      const city =
        address.city || address.town || address.village || "Unknown City";
      const country = address.country || "Unknown Country";

      setLocationData({
        location: road,
        city: city,
        country: country,
      });
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      alert("Failed to fetch location data");
    }
  };

  const handleLocation = () => {
    navigate("/dashboard/add-address");
    onClose?.();

    const [lat, long] = location?.coordinates || [];

    if (lat !== undefined && long !== undefined) {
      reverseGeocode(lat, long);
    } else {
      console.error("Coordinates are undefined");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
      <div className="bg-white absolute rounded-md shadow-lg w-full sm:max-w-[300px] max-w-[280px] md:max-w-[640px] md:px-6 md:py-4 px-6 py-6 h-auto md:h-[11rem] md:top-24 md:left-20">
        <div className="flex items-center justify-between pb-1 mb-1">
          <h2 className="text-base font-medium tracking-wide md:text-lg">
            Change Location
          </h2>
          <button onClick={onClose}>
            <Icon
              icon="line-md:close-circle-filled"
              width="27"
              height="27"
              style={{ color: "#353537" }}
            />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-base">Current address: {addressData} </p>
        </div>
        <div className="flex flex-col-reverse items-center justify-center gap-4 md:flex-row">
          <button
            onClick={handleDetectLocation}
            className="flex gap-3 items-center justify-center px-5 py-3 text-white transition-all bg-[#4A9D4C] rounded-3xl hover:bg-[#2C5F2D] ease-in-out duration-300"
          >
            <Icon icon="fluent:my-location-20-regular" width="20" height="20" />
            <span className="text-sm tracking-wide md:text-base">
              Detect my location
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-8 border-[1px] border-[#B3B3B3]"></span>
            <span className="font-normal text-black bg-[#D9D9D9] rounded-full md:text-[15px] text-[13px] px-2 py-[6px]">
              OR
            </span>
            <span className="w-8 border-[1px] border-[#B3B3B3]"></span>
          </div>

          {/* <div className="flex items-center flex-grow px-3 py-2 border border-gray-500 rounded-[4px] ">
            <Icon
              icon="iconamoon:search-light"
              width="20"
              height="20"
              className=""
            />
            <input
              type="text"
              placeholder="Search delivery location"
              className="flex-grow text-sm outline-none placeholder:pl-2 md:text-base"
            />
          </div> */}
          <div
            className="text-[#4a9d4c] text-center bg-white cursor-pointer font-semibold text-lg rounded-3xl px-5 py-2 transition-all border border-black hover:bg-fade-white ease-in-out duration-300"
            onClick={handleLocation}
          >
            Choose on Map
          </div>
        </div>
      </div>
    </div>
  );
};
