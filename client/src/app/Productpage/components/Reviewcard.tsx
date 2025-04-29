import React from "react";

import { FaStar } from "react-icons/fa";
import ProfileImg from "../../../assets/images/extras/profileImg1.png"

type ReviewProps = {
  name: string;
  date: string;
  rating?: number;
  reviewText: string;
  image?: string;
  className?: string;
};

const ReviewCard: React.FC<ReviewProps> = ({
  name,
  date,
  rating = 0,
  reviewText,
  image,
  className,
}) => {
  return (
    <div
      className={` shadow-md rounded-lg py-5 px-3 border-[#e7e5e5] border-[0.5px] ${className} bg-white`}
    >
      <div className="flex justify-between">
        <div className="flex gap-5">
          {image ? (
            <img src={image} alt="image" className="w-[50px]" />

          ) : (
            <img src={ProfileImg} alt="image" className="w-[60px]" />

          )}
          <div className="text-center ">
            <p className="text-[14px] font-semibold">{name}</p>
            <p className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={`p-[1px] ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </p>
          </div>
        </div>

        <p className="text-[#888888] text-xs">
          {date && !isNaN(Number(date))
            ? new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric"
            }).format(new Date(Number(date)))
            : "Invalid Date"}
        </p>
      </div>
      <p className="mt-2 text-justify">{reviewText}</p>
    </div>
  );
};

export default ReviewCard;
