import React, { createContext, useContext, useEffect, useState } from "react";

interface LocationData {
  coordinates?: [number, number];
  address?: string;
}

interface OrderData {
  name: string;
  email: string;
  address: string;
  landmark: string;
  phone: string;
  coupon?: any;
  orders: any;
  paymentMethod: string;
}

interface LocationContextProps {
  location: LocationData | null;
  setLocation: (data: LocationData) => void;
  orderData: OrderData | null;
  setOrderData: (data: OrderData) => void;
}

const AppContext = createContext<LocationContextProps | undefined>(undefined);

export const useAppData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useLocationData must be used within a LocationProvider");
  }
  return context;
};

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<LocationData | null>(null);

  const [orderData, setOrderData] = useState<OrderData | null>(null);

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

      // Update the location state with the retrieved data
      setLocation((prev) =>
        prev
          ? { ...prev, address: road, city: city, country: country }
          : { address: road, city: city, country: country }
      );
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      alert("Failed to fetch location data");
    }
  };

  useEffect(() => {
    // If coordinates exist but address information is missing, call reverseGeocode
    if (location?.coordinates && !location.address) {
      const [lat, lng] = location.coordinates;
      reverseGeocode(lat, lng);
    }
  }, [location]);

  return (
    <AppContext.Provider
      value={{ location, setLocation, orderData, setOrderData }}
    >
      {children}
    </AppContext.Provider>
  );
};
