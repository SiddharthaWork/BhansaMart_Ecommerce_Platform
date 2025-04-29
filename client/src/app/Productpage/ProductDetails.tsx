import React, { useState, useEffect } from "react";
// import ProductComp from "../Home/components/ProductComp";
import Unitcard from "./components/UnitCard";
import { useParams } from "react-router-dom";
import Reviews from "./components/Reviews";
import { Icon } from "@iconify/react";
import { useGetProductQuery } from "../../redux/api/graphqlBaseApi";
import ReviewBox from "./components/ReviewBox";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [allReviews, setAllReviews] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <h1>Product not found</h1>;
  }

  const { data, error, isLoading } = useGetProductQuery(productId);

  console.log(data);

  const [product, setProduct] = useState<any>(null);
  const cartItem = useSelector((state: RootState) =>
    product
      ? state.cart.items.find((item) => item.id === product._id)
      : undefined
  );
  const quantity = cartItem ? cartItem.quantity : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setProduct(data.getProduct);
    }
  }, [data]);
  console.log("productData", product);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product details</div>;

  const handleCart = () => {
    const cartItem = {
      id: product?._id,
      name: product?.name,
      image: product?.images[0],
      price: product?.sellingPrice,
      quantity: quantity,
    };

    toast.success("Added to cart");
    setAdded(true);
    dispatch(addToCart(cartItem));
  };

  const handleBrandNavigate = (brandName: string, brandId: string) => {
    navigate(`/brand/${brandName}/${brandId}`)
  }

  return (
    <div className="relative mx-5 sm:mx-0">
      <div className="w-full sm:w-[85%] mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left Section (Images) */}
          <div className="w-full py-5 border-b md:w-1/2 md:border-r">
            <div className="flex flex-col items-center justify-center gap-10">
              <img
                src={`https://api-bhansa.webstudiomatrix.com/${product?.images[0]}`}
                alt="Product Image"
                className="w-[60%] sm:w-[40%] md:w-[60%] max-w-[400px]"
              />
              <div className="flex justify-center gap-5 sm:flex-wrap md:flex-row">
                {(product?.images?.length > 1
                  ? product?.images.slice(1, 4)
                  : new Array(3).fill(product?.images[0])
                ).map((img: any, index: any) => (
                  <img
                    key={index}
                    src={`https://api-bhansa.webstudiomatrix.com/${img}`}
                    alt={`Product Image ${index + 1}`}
                    className="w-[100px] h-[100px] border-[1px] border-[#EEEEEE] p-2 rounded-xl"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Section (Product Details) */}
          <div className="w-full px-4 py-5 md:w-1/2 md:px-10">
            <div className="flex flex-col items-center gap-1 md:items-start">
              <p className="text-xs font-medium">
                Home / {product?.category.name} / {product?.subCategory?.name} /
                <span className="text-[#ababab]"> {product?.name}</span>
              </p>
              <h3 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                {product?.name}
              </h3>
              <button className="font-medium text-[#407417] text-sm md:text-base" onClick={() => handleBrandNavigate(product?.brand?.name, product?.brand?._id)}>
                View all by {product?.brand?.name || "Brand Name"}
              </button>
            </div>
            <hr className="my-3" />
            <div className="flex flex-col items-center gap-3 font-medium md:items-start">
              <p className="text-[14px] text-[#868686]">Select Unit</p>
              <div className="flex flex-wrap gap-5">
                {product?.attributes?.map((unit: any, index: any) => (
                  <Unitcard
                    key={index}
                    weight={unit.value}
                    unit={unit.unit}
                    price={Math.ceil(product?.sellingPrice).toString()}
                    isSelected={selectedUnit === unit.value}
                    onClick={() => setSelectedUnit(unit.value)}
                  />
                ))}
              </div>
              <p className="text-xs text-[#868686]">(Inclusive all taxes)</p>
              <button
                className="border-[1px] border-[#4f7743] px-6 py-2 rounded-lg"
                onClick={handleCart}
              >
                Add to Cart
              </button>

              {added ? (
                <QuantityCounter
                  quantity={quantity}
                  productID={productId}
                  setAdded={setAdded}
                />
              ) : null}
            </div>
          </div>
        </div>

        <hr />

        {/* Description Section */}
        <div className="my-4">
          <div>
            <h3 className="font-semibold text-xl text-[#353537] py-1">
              Description
            </h3>
            <p className="text-justify">
              {product?.description || "No product description available."}
            </p>
          </div>

          {/* Review Box */}
          <ReviewBox productData={product} setAllReviews={setAllReviews} />
        </div>
      </div>

      {/* Reviews Modal */}
      {allReviews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white shadow-lg p-6 rounded-xl w-[95%] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <Reviews productData={product} isOpen={allReviews} />
            <button
              className="absolute font-bold right-10 top-10"
              onClick={() => setAllReviews(false)}
            >
              <Icon icon="charm:cross" height={25} width={25} />
            </button>
          </div>
        </div>
      )}

      {/* Kids Section */}
      {/* <ProductComp productData={} productType="Kids" /> */}
    </div>
  );
};

export default ProductDetails;

type Quantity = {
  quantity: number;
  productID: string;
  setAdded: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuantityCounter: React.FC<Quantity> = ({
  quantity,
  productID,
  setAdded,
}) => {
  const dispatch = useDispatch();
  const increment = () => {
    dispatch(updateQuantity({ id: productID, quantity: quantity + 1 }));
  };

  const decrement = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id: productID, quantity: quantity - 1 }));
    } else if (quantity === 1) {
      dispatch(removeFromCart(productID));
      setAdded(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row sm:gap-8">
      <div className="flex items-center ">
        <button
          className="bg-[#016b45] h-10 w-10 sm:h-12 sm:w-12 font-medium text-white text-xl sm:text-2xl rounded-md"
          onClick={decrement}
        >
          -
        </button>
        <p className="font-medium text-xl sm:text-2xl w-[50px] text-center mx-1">
          {quantity}
        </p>
        <button
          className="bg-[#016b45] h-10 w-10 sm:h-12 sm:w-12 font-medium text-white text-xl sm:text-2xl rounded-md"
          onClick={increment}
        >
          +
        </button>
      </div>
      <div>
        <p className="text-sm sm:text-base">
          <span className="text-lg font-medium">{quantity}</span> item(s) added
        </p>
      </div>
    </div>
  );
};
