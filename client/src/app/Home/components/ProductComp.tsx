import React, { useState } from "react";
import ProductCard, { AttributeType } from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

interface ArrowProps {
  onClick?: () => void;
}

interface ProductProp {
  _id: string;
  name: string;
  size: string;
  attributes: AttributeType[];
  sellingPrice: number;
  discountPrice: number;
  images: string[];
  badges: string[];
  status: string;
}

interface ProductDataprops {
  productData: ProductProp[];
  productType: string;
}
const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <span
      className="absolute rotate-180 z-20 left-[35px] top-[40%] transform[-50%] rounded-full bg-white cursor-pointer shadow-custom-x px-4 py-[10px]"
      onClick={onClick}
    >
      <Icon icon="weui:arrow-outlined" width="12" height="24" />
    </span>
  );
};
const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <span
      className="absolute right-[35px] z-20 top-[40%] transform[-50%] rounded-full bg-white cursor-pointer shadow-custom-x px-4 py-[10px]"
      onClick={onClick}
    >
      <Icon icon="weui:arrow-outlined" width="12" height="24" />
    </span>
  );
};

const ProductComp: React.FC<ProductDataprops> = ({
  productData,
  productType,
}) => {
  //dispatching
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(true);

  const slidesToShow = 6;
  const totalSlides = productData.length;

  const handleArrowVisibility = (currentSlide: number) => {
    setShowPrevArrow(currentSlide > 0); // Show prev arrow if not at the first slide
    setShowNextArrow(currentSlide < totalSlides - slidesToShow); // Show next arrow if not at the last slides
  };


  const handleAddToCart = (productId: string, quantity: number) => {
    // const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    // const product = productData.find((p) => p._id === productId);

    // if (product) {
    //   const existingProductIndex = existingCart.findIndex(
    //     (item: any) => item._id === productId
    //   );

    //   if (existingProductIndex !== -1) {
    //     existingCart[existingProductIndex].quantity = quantity;
    //   } else {
    //     existingCart.push({ ...product, quantity });
    //   }
    //   const updatedCart = existingCart.filter((item: any) => item.quantity > 0);
    //   localStorage.setItem("cart", JSON.stringify(updatedCart));
    // }

    // onClick={() => handleRoute(productData?.name)

    const product = productData.find((p) => p._id === productId);

    if (product) {
      const cartItem = {
        id: product._id.toString(),
        name: product.name,
        image: product.images[0] || "",
        price: product.sellingPrice - product.discountPrice,
        quantity: quantity,
      };
      dispatch(addToCart(cartItem));
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    // const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    // const updatedCart = existingCart.filter(
    //   (item: any) => item._id !== productId
    // );
    // localStorage.setItem("cart", JSON.stringify(updatedCart));

    dispatch(removeFromCart(productId.toString()));
  };

  const handleCategoryRoute = (categoryName: string) => {
    // const selectedCategory = categoryName === categoryName;
    navigate("/categories", { state: { selectedCategory: categoryName } });
    console.log("tabCategory", categoryName);
  };

  const settings = {
    slidesToShow: slidesToShow,
    slidesToScroll: 2,
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 2000,
    arrows: true,
    prevArrow: showPrevArrow ? <PrevArrow /> : undefined,
    nextArrow: showNextArrow ? <NextArrow /> : undefined,
    afterChange: (current: number) => handleArrowVisibility(current), // Track after change event
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-6 pt-4 pb-6 lg:px-24 md:px-16">
      <div className="flex flex-col w-full h-full gap-4">
        <div className="flex flex-row items-center justify-between px-2">
          <h2 className="text-lg font-medium lg:text-2xl md:text-xl">
            {productType}
          </h2>
          <p
            className="text-base font-normal cursor-pointer lg:text-xl md:text-lg"
            onClick={() => handleCategoryRoute(productType)}
          >
            See all
          </p>
        </div>
        <Slider className="flex flex-row w-full h-full" {...settings}>
          {productData.map((product, index) => (
            <div key={index} className="w-full h-full ml-2">
              <ProductCard
                product={product}
                customStyles="w-[93%] shadow-custom-x shadow-custom-y bg-[#FCFCFC]"
                onAdd={handleAddToCart}
                onRemove={handleRemoveFromCart}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductComp;
