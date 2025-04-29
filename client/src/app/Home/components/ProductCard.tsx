import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
} from "../../../redux/slices/cartSlice";
import { RootState } from "../../../redux/store";

export interface AttributeType {
  name: string;
  value: string;
  unit: string;
  color: string;
}
interface ProductCardProps {
  product: {
    _id: string;
    images: string[];
    name: string;
    size: string;
    attributes: AttributeType[];
    discountPrice: number;
    sellingPrice: number;
    badges: string[];
  };
  customStyles: string;
  onAdd: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
  dialog?: boolean;
  onOpenDialog?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  customStyles = "",
  onAdd,
  onRemove,
  dialog = false,
  onOpenDialog,
}) => {
  // const [quantity, setQuantity] = useState(() => {
  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   const existingProduct = cart.find((item: any) => item._id === product._id);
  //   return existingProduct ? existingProduct.quantity : 0;
  // });

  const cartItem = useSelector((state: RootState) =>
    state?.cart?.items?.find((item) => item.id === product._id.toString())
  );
  const quantity = cartItem?.quantity || 0;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = (event: React.MouseEvent) => {
    event.stopPropagation();
    // if (dialog) {
    //   onOpenDialog?.(product._id);
    // } else {
    //   setQuantity(1);
    //   onAdd(product._id, 1);
    // }

    if (dialog) {
      onOpenDialog?.(product._id);
    } else {
      // Call parent component's handler
      onAdd(product._id, 1);
    }
  };

  const handleIncrement = (event: React.MouseEvent) => {
    event.stopPropagation();

    // setQuantity((prev: any) => {
    //   const newQuantity = prev + 1;
    //   onAdd(product._id, newQuantity);
    //   return newQuantity;
    // });

    const newQuantity = quantity + 1;
    dispatch(
      updateQuantity({ id: product._id.toString(), quantity: newQuantity })
    );
  };

  const handleDecrement = (event: React.MouseEvent) => {
    event.stopPropagation();
    // setQuantity((prev: any) => {
    //   if (prev > 1) {
    //     const newQuantity = prev - 1;
    //     onAdd(product._id, newQuantity);
    //     return newQuantity;
    //   } else {
    //     onRemove?.(product._id);
    //     return 0;
    //   }
    // });

    if (quantity > 1) {
      const newQuantity = quantity - 1;
      dispatch(
        updateQuantity({ id: product._id.toString(), quantity: newQuantity })
      );
    } else {
      dispatch(removeFromCart(product._id.toString()));
      onRemove?.(product._id);
    }
  };

  return (
    <div
      className={`px-2 relative py-2 md:px-4 md:py-4 lg:px-4 lg:py-4 rounded-lg md:h-[17rem] h-[14.5rem]  ${customStyles}`}
      onClick={() => {
        console.log(product);
        navigate(`/product/${product._id}`);
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-auto px-2 bg-[#FBE9B3] rounded-sm">
        {product?.badges?.length > 0 && (
          <p className="text-[#9B812D] text-center md:text-xs text-[10px] lg:text-[13px]">
            {product.badges[0]}
          </p>
        )}
      </div>

      <div className="flex justify-center flex-shrink-0 mb-4">
        <img
          src={`https://api-bhansa.webstudiomatrix.com/${product?.images[0]}`}
          alt={product?.name}
          className="object-contain w-full h-20 md:h-32"
        />
      </div>
      <h3 className="mt-4 text-xs font-medium text-gray-800 md:text-sm line-clamp-1">
        {product?.name}
      </h3>
      <div className="flex flex-col items-start justify-between flex-grow gap-2 mt-2 sm:gap-0 sm:items-center sm:flex-row">
        <div className="flex flex-col gap-1 md:gap-2">
          {/* <p className="text-sm text-gray-600">10 ml</p> */}
          {product?.attributes.slice(0, 1).map((item, index) => (
            <div key={index}>
              <div className="flex flex-row gap-1">
                <p className="text-xs text-gray-600 md:text-sm">{item.value}</p>
                <p className="text-xs text-gray-600 md:text-sm">{item.unit}</p>
              </div>
            </div>
          ))}
          <p className="text-xs font-medium text-gray-800 md:text-sm ">
            Price: Rs {Math.ceil(product?.sellingPrice).toString()}
          </p>
          {/* {product?.discountPrice === null ? (
            <p className="text-xs font-medium md:text-sm ">

              Price: Rs {Math.ceil(product?.sellingPrice).toString()}
            </p>

          ) : (
            <p className="text-xs font-medium md:text-sm ">

              Price: Rs {Math.ceil(product?.sellingPrice - product?.discountPrice).toString()}
            </p>

          )} */}
        </div>
        <div className="">
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="lg:px-4 md:px-4 px-3 md:py-[6px] py-[5px] lg:text-sm md:text-[13px] text-xs font-semibold text-[#4F7743] transition-colors duration-300 bg-white border border-[#4F7743] rounded-lg hover:bg-[#4F7743] hover:text-white"
            >
              ADD
            </button>
          ) : (
            !dialog && (
              <div className="flex items-center lg:gap-1 gap-[5px] px-[6px] lg:px-2 lg:py-[6px] py-[5px] bg-[#539818] rounded-lg text-white">
                <button
                  onClick={handleDecrement}
                  className="text-lg font-bold lg:text-lg"
                >
                  -
                </button>
                <span className="w-5 text-sm font-semibold text-center md:text-[15px] lg:text-base">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="text-lg font-bold lg:text-lg"
                >
                  +
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
