// import reviews from "../reviewdata/data"; // Adjust the import path as needed
import { FaStar } from "react-icons/fa";
import ReviewCard from "./Reviewcard";
import React, { useEffect } from "react";

interface Reviewprops {
  productData: any;
  isOpen: boolean;
}
const Reviews: React.FC<Reviewprops> = ({ productData, isOpen }) => {

  const reviewsData = productData?.reviews;
  console.log("reviewsData", reviewsData)

  // Function to calculate the width of the rating progress bar
  const ratingLineWidth = (value: number, total: number) => {
    return (value / total) * 100;
  };

  // Initialize star ratings count
  const starRatingsCount: { [key: number]: number } = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  // Count the occurrences of each rating
  reviewsData.forEach((review: any) => {
    if (review.rating >= 1 && review.rating <= 5) {
      starRatingsCount[review.rating]++;
    }
  });

  // Calculate total number of reviews
  const totalReviews = reviewsData.length;

  const averageRating =
    Math.round(
      (reviewsData.reduce((sum: any, review: any) => sum + review.rating, 0) / totalReviews) *
      10
    ) / 10;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Enable scroll
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup when unmounted
    };
  }, [isOpen]);

  return (
    <div className="lg:h-[29rem] md:h-[26rem] h-[26rem] p-4 overflow-auto">
      {/* Title */}
      <h1 className="text-lg font-bold text-center">Reviews</h1>

      {/* Total Rating and Verified Badge */}
      <div className="flex items-center justify-between my-5">
        <span className="flex items-center gap-2 text-lg font-semibold">
          <FaStar className="text-yellow-500" /> {averageRating}{" "}
          <span className="font-light">({totalReviews})</span>
        </span>
        <span className="bg-[#d9f2e7] text-[#2c5f2d] px-2 rounded-lg py-[1px] text-sm">
          Verified by <span className="font-semibold">shop</span>
        </span>
      </div>

      {/* Star Rating Distribution */}
      <div className="flex flex-col gap-2 mb-16">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div className="flex items-center gap-2" key={rating}>
            <p className="w-4 font-semibold text-right">{rating}</p>
            <FaStar className="text-xl text-yellow-500" />
            <div className="bg-gray-200 w-full h-[6px] overflow-hidden rounded-lg">
              <div
                className="h-full bg-blue-500"
                style={{
                  width: `${ratingLineWidth(
                    starRatingsCount[rating],
                    totalReviews
                  )}%`,
                }}
              ></div>
            </div>
            <p className="w-4 font-semibold text-left">
              {starRatingsCount[rating]}
            </p>
          </div>
        ))}
      </div>

      {/* List of Reviews */}
      <div className="space-y-4">
        {reviewsData.map((review: any, index: number) => (
          <ReviewCard
            key={review?._id || index}
            name={review?.user?.name}
            date={review?.createdAt}
            rating={review?.rating}
            reviewText={review?.reviewText}
            image={review?.userImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
