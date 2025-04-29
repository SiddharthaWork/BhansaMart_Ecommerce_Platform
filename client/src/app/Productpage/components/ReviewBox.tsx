import { FaStar } from "react-icons/fa";
import ReviewCard from "./Reviewcard";
import React from "react";

type ReviewBoxProps = {
  productData?: any;
  setAllReviews: React.Dispatch<React.SetStateAction<boolean>>; // Function to update state from the parent
};


const ReviewBox: React.FC<ReviewBoxProps> = ({ productData, setAllReviews }) => {

  console.log("reviewpropdata", productData)

  const numberOfReviews = productData?.numberOfReviews;
  const averageRating = productData?.averageRating;
  const reviewsData = productData?.reviews;

  return (
    <div className="my-5">
      {/* Header Section */}
      <div className="flex justify-between mb-3 font-medium">
        <div className="flex items-center gap-2 text-xl font-medium">
          <h3>Reviews</h3>
          <p className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index}
                className={`p-[1px] ${index < averageRating ? "text-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </p>
          <p className="text-sm font-normal">({numberOfReviews || 0})</p>
        </div>
        <p
          className="cursor-pointer text-[#407417] font-medium text-sm sm:text-base mt-2 sm:mt-0"
          onClick={() => setAllReviews(true)}
        >
          See all
        </p>
      </div>

      {/* Review Cards Section */}
      <div className="flex flex-wrap gap-5 ">
        {/* Loop through the reviews and display the first 3 */}
        {reviewsData?.slice(0, 3).map((review: any, index: number) => (
          <ReviewCard
            key={index}
            name={review?.user?.name}
            date={review?.createdAt}
            rating={review?.rating}
            reviewText={review?.reviewText}
            image={review?.userImage}
            className="w-full sm:w-[48%] md:w-[32%] lg:w-[32%]"
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewBox;
