import React from "react";

type CardProps = {
  weight: string;
  price: string;
  unit: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const Unitcard: React.FC<CardProps> = ({
  weight,
  price,
  onClick,
  isSelected,
  unit,
}) => {
  return (
    <div
      className={` px-6 py-3 border-[1px] border-[#388139] rounded-2xl cursor-pointer ${
        isSelected ? "bg-[#f3faf3]" : "bg-white"
      }`}
      onClick={onClick}
    >
      <p className="text-xs">
        {weight} <span>{unit}</span>
      </p>
      <p className="font-medium">Rs. {price}</p>
    </div>
  );
};

export default Unitcard;
